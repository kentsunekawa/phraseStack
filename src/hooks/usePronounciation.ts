import { useCallback, useEffect, useMemo, useState } from 'react'
import { useReactiveVar } from '@apollo/client'

import { voiceVar, availableVoicesVar } from 'cache'
import { useCookies } from './useCookies'

export const setAvailableVoices = (availableVoices: SpeechSynthesisVoice[]) => {
  availableVoicesVar(availableVoices)
}

export const setVoice = (selectedVoice: SpeechSynthesisVoice | null) => {
  voiceVar(selectedVoice)
}

export const usePronounciation = () => {
  const { setCookie, removeCookie } = useCookies()

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const utterance = useMemo(() => new SpeechSynthesisUtterance(), [])
  const voice = useReactiveVar(voiceVar)
  const availableVoices = useReactiveVar(availableVoicesVar)

  const selectVoice = useCallback(
    (selectedVoice: SpeechSynthesisVoice | null) => {
      if (selectedVoice) {
        setCookie('voice', selectedVoice.name)
      } else {
        removeCookie('voice')
      }

      setVoice(selectedVoice)
    },
    [setCookie, removeCookie]
  )

  const pronounce = useCallback(
    (text: string) => {
      const currentVoice = voice ?? availableVoices[0]

      utterance.voice = currentVoice
      utterance.lang = currentVoice.lang
      utterance.text = text
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    },
    [utterance, voice, availableVoices]
  )

  useEffect(() => {
    const handleStart = () => {
      setIsSpeaking(true)
    }

    const handleEnd = () => {
      setIsSpeaking(false)
    }

    utterance.addEventListener('start', handleStart)
    utterance.addEventListener('end', handleEnd)

    return () => {
      utterance.removeEventListener('start', handleStart)
      utterance.removeEventListener('end', handleEnd)
    }
  }, [utterance])

  return { isSpeaking, voice, availableVoices, pronounce, selectVoice }
}
