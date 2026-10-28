import type {StructureResolver} from 'sanity/structure'
import {
  BellIcon,
  DocumentTextIcon,
  HelpCircleIcon,
  StarIcon,
  UsersIcon,
  PlayIcon,
  ClipboardIcon,
} from '@sanity/icons'

/** XGamer sidebar: website content first, existing season data second. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('XGamer Studio')
    .items([
      S.listItem()
        .title('Tournaments')
        .icon(StarIcon)
        .child(
          S.documentTypeList('tournament')
            .title('Tournaments')
            .defaultOrdering([{field: 'startDate', direction: 'desc'}]),
        ),
      S.listItem()
        .title('Announcements')
        .icon(BellIcon)
        .child(
          S.documentTypeList('announcement')
            .title('Announcements')
            .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
        ),
      S.listItem()
        .title('Rules page')
        .icon(DocumentTextIcon)
        .child(S.document().schemaType('rulesPage').documentId('rulesPage').title('Rules page')),
      S.listItem()
        .title('FAQ')
        .icon(HelpCircleIcon)
        .child(
          S.documentTypeList('faq').title('FAQ').defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),
      S.divider(),
      S.listItem()
        .title('League season — players')
        .icon(UsersIcon)
        .child(S.documentTypeList('team').title('League players / teams')),
      S.listItem()
        .title('League season — matches')
        .icon(PlayIcon)
        .child(
          S.documentTypeList('match')
            .title('League matches')
            .filter('_type == "match" && deleted != true'),
        ),
      S.divider(),
      S.listItem()
        .title('Audit log')
        .icon(ClipboardIcon)
        .child(
          S.documentTypeList('auditLog')
            .title('Audit log')
            .defaultOrdering([{field: '_createdAt', direction: 'desc'}]),
        ),
    ])
