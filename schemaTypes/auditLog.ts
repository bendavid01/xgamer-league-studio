import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'auditLog',
  title: 'Audit Logs',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'action',
      title: 'Action',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'match',
      title: 'Related Match',
      type: 'reference',
      to: [{ type: 'match' }],
      weak: true
    }),
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
    }),
  ],
})