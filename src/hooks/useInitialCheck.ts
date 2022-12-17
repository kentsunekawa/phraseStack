import { useReactiveVar } from '@apollo/client'

import { isInitialCheckedVar } from 'cache'

export const setIsInitialChecked = (isInitialChecked: boolean) =>
  isInitialCheckedVar(isInitialChecked)

export const useInitialCheck = () => {
  const isInitialChecked = useReactiveVar(isInitialCheckedVar)

  return {
    isInitialChecked,
  }
}
