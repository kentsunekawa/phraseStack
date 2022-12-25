import { useStyle, StyleBaseData } from './useStyle'
import { useInitialCheck, setIsInitialChecked } from './useInitialCheck'
import { useLoading, setIsLoading } from './useLoading'
import { useAccount, setAccount } from './useAccount'
import {
  usePronounciation,
  setVoice,
  setRate,
  setAvailableVoices,
} from './usePronounciation'
import { useLastCursor, setLastCursor } from './useLastCursor'
import { useSettingMenu, toggleSettingMenu } from './useSettingMenu'
import { usePageNum, setPageNum } from './usePageNum'
import { useFixWindowHeight } from './useFixWindowHeight'
import { useFormStyles } from './useFormStyles'
import { useUpdateLastCursor } from './useUpdateLastCursor'

export type { StyleBaseData }

export {
  useStyle,
  useInitialCheck,
  setIsInitialChecked,
  useLoading,
  setIsLoading,
  useAccount,
  setAccount,
  usePronounciation,
  setAvailableVoices,
  setVoice,
  setRate,
  useLastCursor,
  setLastCursor,
  useSettingMenu,
  toggleSettingMenu,
  usePageNum,
  setPageNum,
  useFixWindowHeight,
  useFormStyles,
  useUpdateLastCursor,
}
