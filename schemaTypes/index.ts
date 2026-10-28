import team from './team'
import match from './match'
import auditLog from './auditLog'
import tournament from './tournament'
import announcement from './announcement'
import rulesPage from './rulesPage'
import faq from './faq'

export const schemaTypes = [tournament, announcement, rulesPage, faq, team, match, auditLog]

/** Types that exist exactly once and open directly from the sidebar. */
export const singletonTypes = new Set(['rulesPage'])
