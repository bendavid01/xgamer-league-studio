import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'team',
  title: 'Teams',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Player Name / Team Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'string',
      options: {
        list: [
          { title: 'Group A', value: 'A' },
          { title: 'Group B', value: 'B' },
        ],
        layout: 'radio',
      },
      initialValue: 'A',
    }),
    defineField({
      name: 'squad',
      title: 'Squad List (Optional)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'group',
    },
    prepare({ title, subtitle }) {
      return {
        title: title,
        subtitle: `Group ${subtitle}`,
      }
    },
  },
})