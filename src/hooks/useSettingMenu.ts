import { useReactiveVar } from '@apollo/client'

import { isOpenSettingMenuVar } from 'cache'

export const toggleSettingMenu = (isOpen: boolean) => {
  isOpenSettingMenuVar(isOpen)
}

export const useSettingMenu = () => {
  const isOpen = useReactiveVar(isOpenSettingMenuVar)

  return { isOpen }
}
