import { useReactiveVar } from '@apollo/client'

import { isLoadingVar } from 'cache'

export const setIsLoading = (isLoading: boolean) => isLoadingVar(isLoading)

export const useLoading = () => {
  const isLoading = useReactiveVar(isLoadingVar)

  return {
    isLoading,
  }
}
