import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {SoftDeleteMatchAction} from './actions/softDeleteMatch'

export default defineConfig({
  name: 'default',
  title: 'xgamer-studio',

  projectId: 'aqtsgm5o',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  // WHY: Replace hard delete with soft delete for matches (auditLog references them)
  document: {
    actions: (prev, context) =>
      prev.map((action) =>
        action.action === 'delete' && context.schemaType === 'match'
          ? SoftDeleteMatchAction
          : action
      ),
  },
})
