/**
 * Soft Delete for matches: patches { deleted: true } instead of hard delete.
 * WHY: auditLog references matches; hard delete would cascade or fail.
 *
 * Example patch (API/CLI):
 *   client.patch(matchId).set({ deleted: true }).commit()
 */
import { useDocumentOperation } from 'sanity'

export function SoftDeleteMatchAction(props: { id: string; type: string; onComplete: () => void }) {
  const { patch, publish } = useDocumentOperation(props.id, props.type)

  if (props.type !== 'match') return null

  return {
    // Replace the built-in delete action
    action: 'delete',
    label: 'Delete',
    tone: 'critical' as const,
    disabled: !patch || patch.disabled,
    onHandle: () => {
      // Patch deleted: true instead of actually deleting
      patch.execute([{ set: { deleted: true } }])
      publish.execute()
      props.onComplete()
    },
  }
}
