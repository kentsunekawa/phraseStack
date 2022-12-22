import { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'

import { pageNumVar } from 'cache'
import { useCookies } from './useCookies'

export const setPageNum = (pageNum: number) => {
  pageNumVar(pageNum)
}

export const usePageNum = () => {
  const { setCookie } = useCookies()
  const pageNum = useReactiveVar(pageNumVar)

  const selectPageNum = useCallback(
    (num: number) => {
      setCookie('pageNum', num)
      pageNumVar(num)
    },
    [setCookie]
  )

  return {
    pageNum,
    selectPageNum,
  }
}
