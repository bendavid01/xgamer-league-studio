import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'team',
  title: 'Teams',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Team Name', // e.g. "Cyber United"
      type: 'string',
    }),
    // ✅ NEW FIELD: This lets you add the Gamer Tag separately
    defineField({
      name: 'player',
      title: 'Player Name / Gamer Tag', // e.g. "Alex_Viper"
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    // Stats
    defineField({ name: 'played', title: 'Played', type: 'number', initialValue: 0 }),
    defineField({ name: 'won', title: 'Won', type: 'number', initialValue: 0 }),
    defineField({ name: 'drawn', title: 'Drawn', type: 'number', initialValue: 0 }),
    defineField({ name: 'lost', title: 'Lost', type: 'number', initialValue: 0 }),
    defineField({ name: 'gf', title: 'Goals For', type: 'number', initialValue: 0 }),
    defineField({ name: 'ga', title: 'Goals Against', type: 'number', initialValue: 0 }),
    defineField({ name: 'pts', title: 'Points', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'player', // ✅ Preview will now show "Cyber United" above "Alex_Viper"
      media: 'logo',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: title,
        subtitle: subtitle ? `@${subtitle}` : 'No Player Assigned',
        media: media,
      }
    },
  },
})