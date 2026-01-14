import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'match',
  title: 'Matches',
  type: 'document',
  preview: {
    select: {
      home: 'homeTeam.name',
      away: 'awayTeam.name',
      scoreA: 'homeScore',
      scoreB: 'awayScore',
      status: 'status'
    },
    prepare({ home, away, scoreA, scoreB, status }) {
      return {
        title: `${home || 'TBD'} vs ${away || 'TBD'}`,
        subtitle: status === 'completed' ? `${scoreA} - ${scoreB}` : status
      };
    }
  },
  fields: [
    defineField({
      name: 'homeTeam',
      title: 'Home Team',
      type: 'reference',
      to: [{ type: 'team' }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'awayTeam',
      title: 'Away Team',
      type: 'reference',
      to: [{ type: 'team' }],
      // ✅ FIXED: Using 'any' to prevent TypeScript crashes
      validation: Rule => Rule.required().custom((value, context) => {
        const homeRef = (context.document as any)?.homeTeam?._ref;
        const awayRef = (value as any)?._ref;
        if (homeRef && awayRef && homeRef === awayRef) {
          return "Home and Away teams cannot be the same";
        }
        return true;
      })
    }),

    defineField({
      name: 'group',
      title: 'Group Stage',
      type: 'string',
      options: { list: ['A', 'B'], layout: 'radio' },
      initialValue: 'A',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Match Status',
      type: 'string',
      options: {
        list: [
          { title: 'Scheduled', value: 'scheduled' },
          { title: 'Live', value: 'live' },
          { title: 'Completed', value: 'completed' }
        ],
        layout: 'radio'
      },
      initialValue: 'scheduled'
    }),
    defineField({
      name: 'homeScore',
      title: 'Home Score',
      type: 'number',
      initialValue: 0
    }),
    defineField({
      name: 'awayScore',
      title: 'Away Score',
      type: 'number',
      initialValue: 0
    })
  ]
})