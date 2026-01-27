import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'auditLog',
  title: 'Audit Logs',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Score Changed', value: 'SCORE_CHANGED' },
          { title: 'Match Completed', value: 'MATCH_COMPLETED' },
          { title: 'Match Published', value: 'MATCH_PUBLISHED' },
          { title: 'Match Deleted', value: 'MATCH_DELETED' },
          { title: 'Match Created', value: 'MATCH_CREATED' },
          { title: 'Team Created', value: 'TEAM_CREATED' },
          { title: 'Team Updated', value: 'TEAM_UPDATED' },
          { title: 'Team Deleted', value: 'TEAM_DELETED' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'match',
      title: 'Related Match',
      type: 'reference',
      to: [{ type: 'match' }],
      weak: true,
      description: 'Optional; populated for match events.',
    }),
    defineField({
      name: 'team',
      title: 'Related Team',
      type: 'reference',
      to: [{ type: 'team' }],
      weak: true,
      description: 'Optional; populated for team events.',
    }),
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
})