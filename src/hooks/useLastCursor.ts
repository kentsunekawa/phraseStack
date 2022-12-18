import { useReactiveVar } from '@apollo/client'
import { lastCursorVar } from 'cache'

export const setLastCursor = (cursor: string | null) => {
  lastCursorVar(cursor)
}

export const useLastCursor = () => {
  const lastCursor = useReactiveVar(lastCursorVar)

  return { lastCursor }
}
