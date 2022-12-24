import { useCallback } from 'react'

import { usePublishProgressStatusMutation } from 'operations/mutations/__generated__/PublishProgressStatus'
import { useUpdateLastCursorMutation } from 'operations/mutations/__generated__/UpdateLastCursor'

export const useUpdateLastCursor = () => {
  const [update] = useUpdateLastCursorMutation()
  const [publish] = usePublishProgressStatusMutation()

  const publishProgressStatus = useCallback(
    (id: string) => {
      if (id) {
        void publish({
          variables: {
            id,
          },
          onError: () => {},
        })
      }
    },
    [publish]
  )

  const updateLastCursor = useCallback(
    (id: string | null, lastCursor: string | null) => {
      if (id) {
        void update({
          variables: {
            id,
            lastCursor,
          },
          onCompleted: () => {
            publishProgressStatus(id)
          },
          onError: () => {},
        })
      }
    },
    [update, publishProgressStatus]
  )

  return { updateLastCursor }
}
