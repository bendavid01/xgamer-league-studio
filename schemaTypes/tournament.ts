import {defineArrayMember, defineField, defineType} from 'sanity'
import {StarIcon} from '@sanity/icons'

/**
 * Public tournament details (CM).
 * WHY: Organizers publish format, size and dates here so the website can show them
 * without the private OM database. Private player data and live slot counts stay in OM.
 */
export const FORMATS = [
  {title: 'League (round robin)', value: 'league'},
  {title: 'Knockout', value: 'knockout'},
  {title: 'League + Knockout', value: 'league_knockout'},
]

export const STATUSES = [
  {title: 'Announced — registration not open yet', value: 'announced'},
  {title: 'Registration open', value: 'registration_open'},
  {title: 'Registration closed', value: 'registration_closed'},
  {title: 'In progress', value: 'in_progress'},
  {title: 'Completed', value: 'completed'},
]

export default defineType({
  name: 'tournament',
  title: 'Tournaments',
  type: 'document',
  icon: StarIcon,
  groups: [
    {name: 'basics', title: 'Basics', default: true},
    {name: 'format', title: 'Format & slots'},
    {name: 'rules', title: 'Match rules'},
    {name: 'money', title: 'Fee & prize'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Tournament name',
      type: 'string',
      group: 'basics',
      description: 'e.g. "XGamer November Cup"',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'slug',
      title: 'URL name',
      type: 'slug',
      group: 'basics',
      options: {source: 'title', maxLength: 60},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showOnHomepage',
      title: 'Show on homepage',
      type: 'boolean',
      group: 'basics',
      description: 'Only one tournament should be shown on the homepage at a time.',
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true
          const id = (context.document?._id ?? '').replace(/^drafts\./, '')
          const client = context.getClient({apiVersion: '2024-01-01'})
          const others = await client.fetch<number>(
            'count(*[_type == "tournament" && showOnHomepage == true && !(_id in [$id, $draft])])',
            {id, draft: `drafts.${id}`},
          )
          return others > 0
            ? 'Another tournament is already on the homepage. Turn it off there first.'
            : true
        }),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'basics',
      options: {list: STATUSES, layout: 'radio'},
      initialValue: 'announced',
      description:
        'Controls the main website button. "Registration open" only shows the Register button — the form itself stays closed until OM registration is switched on.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'game',
      title: 'Game / platform',
      type: 'string',
      group: 'basics',
      initialValue: 'eFootball — Mobile',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      group: 'basics',
      description: 'Leave empty until the date is confirmed. Empty dates are not shown.',
    }),
    defineField({
      name: 'registrationDeadline',
      title: 'Registration closes',
      type: 'datetime',
      group: 'basics',
      description: 'Optional. Shown only when set.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const start = (context.document as {startDate?: string} | undefined)?.startDate
          if (value && start && value.slice(0, 10) > start)
            return 'Registration should close on or before the start date.'
          return true
        }),
    }),
    defineField({
      name: 'summary',
      title: 'Short summary',
      type: 'text',
      rows: 3,
      group: 'basics',
      description: 'One or two plain sentences. Shown under the title.',
      validation: (Rule) => Rule.max(240),
    }),

    defineField({
      name: 'format',
      title: 'Format',
      type: 'string',
      group: 'format',
      options: {list: FORMATS, layout: 'radio'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'playersNeeded',
      title: 'Players needed',
      type: 'number',
      group: 'format',
      options: {list: [8, 16, 32, 64], layout: 'radio', direction: 'horizontal'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leagueOpponents',
      title: 'League matches per player',
      type: 'number',
      group: 'format',
      description:
        'For League + Knockout: how many different opponents each player faces. Leave empty for a full round robin.',
      hidden: ({document}) => document?.format !== 'league_knockout',
      validation: (Rule) =>
        Rule.integer()
          .min(1)
          .custom((value, context) => {
            const players = (context.document as {playersNeeded?: number} | undefined)
              ?.playersNeeded
            if (value && players && value >= players)
              return 'Must be fewer than the number of players.'
            return true
          }),
    }),
    defineField({
      name: 'qualifiers',
      title: 'Qualify for knockout',
      type: 'number',
      group: 'format',
      options: {
        list: [
          {title: 'Top 4', value: 4},
          {title: 'Top 8', value: 8},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      hidden: ({document}) => document?.format !== 'league_knockout',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const doc = context.document as {format?: string; playersNeeded?: number} | undefined
          if (doc?.format !== 'league_knockout') return true
          if (!value) return 'Choose Top 4 or Top 8.'
          if (doc.playersNeeded && value >= doc.playersNeeded)
            return 'Must be fewer than the number of players.'
          return true
        }),
    }),

    defineField({
      name: 'matchRules',
      title: 'Match rules cards',
      type: 'array',
      group: 'rules',
      description:
        'Shown as cards on the website, e.g. "Platform & controls", "Squad restriction", "Match settings", "Match coordination". Only confirmed rules.',
      validation: (Rule) => Rule.max(6),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'ruleCard',
          fields: [
            defineField({
              name: 'title',
              title: 'Card title',
              type: 'string',
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: 'items',
              title: 'Points',
              type: 'array',
              of: [{type: 'string'}],
              description: 'One short line per point, e.g. "Match time: 10 minutes".',
              validation: (Rule) => Rule.required().min(1).max(8),
            }),
          ],
          preview: {select: {title: 'title', items: 'items'}, prepare: ({title, items}) => ({
            title,
            subtitle: Array.isArray(items) ? items.join(' · ') : '',
          })},
        }),
      ],
    }),

    defineField({
      name: 'entryFee',
      title: 'Entry fee (₹)',
      type: 'number',
      group: 'money',
      description: 'Leave empty if not confirmed. Enter 0 for free entry.',
      validation: (Rule) => Rule.min(0).integer(),
    }),
    defineField({
      name: 'prize',
      title: 'Prize',
      type: 'string',
      group: 'money',
      description: 'e.g. "₹5,000 prize pool". Leave empty until confirmed — empty prizes are not shown.',
      validation: (Rule) => Rule.max(80),
    }),
  ],
  orderings: [
    {title: 'Start date, newest', name: 'startDesc', by: [{field: 'startDate', direction: 'desc'}]},
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      players: 'playersNeeded',
      format: 'format',
      home: 'showOnHomepage',
    },
    prepare({title, status, players, format, home}) {
      const f = FORMATS.find((x) => x.value === format)?.title ?? 'No format'
      const s = STATUSES.find((x) => x.value === status)?.title.split(' — ')[0] ?? ''
      return {
        title: `${home ? '★ ' : ''}${title ?? 'Untitled tournament'}`,
        subtitle: [s, f, players ? `${players} players` : ''].filter(Boolean).join(' · '),
      }
    },
  },
})
