import {buildLegacyTheme, defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes, singletonTypes} from './schemaTypes'
import {SoftDeleteMatchAction} from './actions/softDeleteMatch'
import {ControlCenterTool} from './tools/controlCenter'
import {structure} from './structure'
import {XGamerLogo} from './components/XGamerLogo'

/** XGamer cyan/slate identity for the Studio UI. */
const theme = buildLegacyTheme({
  '--black': '#020617',
  '--white': '#f8fafc',
  '--gray': '#64748b',
  '--gray-base': '#64748b',
  '--component-bg': '#0b1118',
  '--component-text-color': '#e2e8f0',
  '--brand-primary': '#22d3ee',
  '--default-button-color': '#64748b',
  '--default-button-primary-color': '#0891b2',
  '--default-button-success-color': '#059669',
  '--default-button-warning-color': '#d97706',
  '--default-button-danger-color': '#e11d48',
  '--state-info-color': '#22d3ee',
  '--state-success-color': '#059669',
  '--state-warning-color': '#d97706',
  '--state-danger-color': '#e11d48',
  '--main-navigation-color': '#020617',
  '--main-navigation-color--inverted': '#f8fafc',
  '--focus-color': '#22d3ee',
})

const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'XGamer Studio (CM)',
  icon: XGamerLogo,
  theme,

  projectId: 'aqtsgm5o',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool()],
  tools: [{name: 'control-center', title: 'Organizer Manager (OM)', component: ControlCenterTool}],

  schema: {
    types: schemaTypes,
    // WHY: singletons (Rules page) are opened from the sidebar, never created twice.
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType)),
  },

  document: {
    newDocumentOptions: (prev, {creationContext}) =>
      creationContext.type === 'global'
        ? prev.filter((item) => !singletonTypes.has(item.templateId))
        : prev,
    actions: (prev, context) => {
      if (singletonTypes.has(context.schemaType))
        return prev.filter(({action}) => action && singletonActions.has(action))
      // WHY: Replace hard delete with soft delete for matches (auditLog references them)
      return prev.map((action) =>
        action.action === 'delete' && context.schemaType === 'match'
          ? SoftDeleteMatchAction
          : action,
      )
    },
  },
})
