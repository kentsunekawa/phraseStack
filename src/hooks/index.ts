import { useStyle, StyleBaseData } from './useStyle'
import { useInitialCheck, setIsInitialChecked } from './useInitialCheck'
import { useLoading, setIsLoading } from './useLoading'
import { useCookies } from './useCookies'
import { useAccount, setAccount } from './useAccount'
import {
  usePronounciation,
  setVoice,
  setAvailableVoices,
} from './usePronounciation'
import { useLastCursor, setLastCursor } from './useLastCursor'

export type { StyleBaseData }

export {
  useStyle,
  useInitialCheck,
  setIsInitialChecked,
  useLoading,
  setIsLoading,
  useCookies,
  useAccount,
  setAccount,
  usePronounciation,
  setAvailableVoices,
  setVoice,
  useLastCursor,
  setLastCursor,
}
