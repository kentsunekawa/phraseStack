import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'

import { setLocalStorage } from 'utils'
import { pageNumVar } from 'cache'

export const setPageNum = (pageNum: number) => {
  pageNumVar(pageNum)
}

export const usePageNum = () => {
  const pageNum = useReactiveVar(pageNumVar)

  const selectPageNum = useCallback((num: number) => {
    setLocalStorage('pageNum', num.toString())
    pageNumVar(num)
  }, [])

  return {
    pageNum,
    selectPageNum,
  }
}
