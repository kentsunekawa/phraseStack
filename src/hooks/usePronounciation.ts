import { useCallback, useEffect, useMemo, useState } from 'react'
import { useReactiveVar } from '@apollo/client'

import { voiceVar, availableVoicesVar, pronounceRateVar } from 'cache'
import { useCookies } from './useCookies'

export const setAvailableVoices = (availableVoices: SpeechSynthesisVoice[]) => {
  availableVoicesVar(availableVoices)
}

export const setVoice = (selectedVoice: SpeechSynthesisVoice | null) => {
  voiceVar(selectedVoice)
}

export const setRate = (rate: number) => {
  pronounceRateVar(rate)
}

export const usePronounciation = () => {
  const { setCookie } = useCookies()

  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const utterance = useMemo(() => new SpeechSynthesisUtterance(), [])
  const voice = useReactiveVar(voiceVar)
  const rate = useReactiveVar(pronounceRateVar)
  const availableVoices = useReactiveVar(availableVoicesVar)

  const selectVoice = useCallback(
    (selectedVoice: SpeechSynthesisVoice | null) => {
      setCookie('voice', { name: selectedVoice?.name ?? '', rate })

      voiceVar(selectedVoice)
    },
    [rate, setCookie]
  )

  const changeRate = useCallback(
    (changedRate: number) => {
      setCookie('voice', { name: voice?.name ?? '', rate: changedRate })
      pronounceRateVar(changedRate)
    },
    [voice, setCookie]
  )

  const pronounce = useCallback(
    (text: string) => {
      const currentVoice = voice ?? availableVoices[0]

      utterance.voice = currentVoice
      utterance.lang = currentVoice.lang
      utterance.text = text
      utterance.rate = rate
      speechSynthesis.speak(utterance)
    },
    [utterance, voice, rate, availableVoices]
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

  return {
    isSpeaking,
    voice,
    rate,
    availableVoices,
    pronounce,
    selectVoice,
    changeRate,
  }
}
