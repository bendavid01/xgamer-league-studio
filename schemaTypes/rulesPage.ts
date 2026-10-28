import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

/** Singleton: the public /rules page. When unpublished, the website keeps its built-in rules. */
export default defineType({
  name: 'rulesPage',
  title: 'Rules page',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description:
        'Suggested: Platform & game mode, Squad restrictions, Match settings, Disconnects, Deadlines, Fair play, Penalties, Disputes.',
      validation: (Rule) => Rule.required().min(1).max(20),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'ruleSection',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (Rule) => Rule.required().max(60),
            }),
            defineField({
              name: 'points',
              title: 'Points',
              type: 'array',
              of: [{type: 'text', rows: 2}],
              validation: (Rule) => Rule.required().min(1).max(15),
            }),
          ],
          preview: {select: {title: 'heading', points: 'points'}, prepare: ({title, points}) => ({
            title,
            subtitle: Array.isArray(points) ? `${points.length} point(s)` : '',
          })},
        }),
      ],
    }),
    defineField({
      name: 'lastReviewed',
      title: 'Last reviewed',
      type: 'date',
      description: 'Shown on the page as "Rules last updated".',
    }),
  ],
  preview: {prepare: () => ({title: 'Rules page'})},
})
