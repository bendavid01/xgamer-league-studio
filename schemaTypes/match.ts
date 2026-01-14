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
      options: {
        filter: ({ document }: any) => {
          if (!document.group) {
            return {
              filter: '!defined(group)' // Return teams with no group or handle as needed, or just return all? 
              // Actually better to just return nothing if no group selected, but group is required.
              // Let's trying falling back to a dummy query or ensuring group exists.
            }
          }
          return {
            filter: 'group == $group',
            params: { group: document.group }
          }
        }
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'awayTeam',
      title: 'Away Team',
      type: 'reference',
      to: [{ type: 'team' }],
      options: {
        filter: ({ document }: any) => {
          if (!document.group) return { filter: '_id == "nothing"' };

          return {
            filter: 'group == $group && _id != $homeTeamId',
            params: {
              group: document.group,
              homeTeamId: document.homeTeam?._ref || "nothing"
            }
          }
        }
      },
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
      name: 'stage',
      title: 'Stage',
      type: 'string',
      options: {
        list: ['Group Stage', 'Knockout Stage'],
        layout: 'radio'
      },
      initialValue: 'Group Stage'
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