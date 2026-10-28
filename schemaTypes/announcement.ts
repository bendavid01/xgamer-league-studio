import {defineField, defineType} from 'sanity'
import {BellIcon} from '@sanity/icons'

/** Public news and updates (CM). Never put private player details here. */
export default defineType({
  name: 'announcement',
  title: 'Announcements',
  type: 'document',
  icon: BellIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 6,
      description: 'Plain text. Line breaks are kept. Do not include phone numbers or room codes.',
      validation: (Rule) => Rule.required().max(1500),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date shown',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pinned',
      title: 'Pin to top',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tournament',
      title: 'Related tournament',
      type: 'reference',
      to: [{type: 'tournament'}],
      description: 'Optional.',
    }),
    defineField({
      name: 'link',
      title: 'Button link (optional)',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Button text', type: 'string', validation: (Rule) => Rule.max(30)}),
        defineField({
          name: 'href',
          title: 'Link',
          type: 'url',
          validation: (Rule) => Rule.uri({scheme: ['https'], allowRelative: true}),
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value: {label?: string; href?: string} | undefined) =>
          value && !!value.label !== !!value.href ? 'Fill in both the button text and the link, or neither.' : true,
        ),
    }),
  ],
  orderings: [
    {title: 'Newest first', name: 'newest', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', date: 'publishedAt', pinned: 'pinned'},
    prepare: ({title, date, pinned}) => ({
      title: `${pinned ? '📌 ' : ''}${title ?? 'Untitled'}`,
      subtitle: date ? new Date(date).toLocaleDateString('en-IN', {dateStyle: 'medium'}) : '',
    }),
  },
})
