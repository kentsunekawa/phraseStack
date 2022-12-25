import { useCallback, useEffect, useMemo, useState } from 'react'
import { useReactiveVar } from '@apollo/client'

import { setLocalStorage } from 'utils'
import { voiceVar, availableVoicesVar, pronounceRateVar } from 'cache'

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
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false)
  const utterance = useMemo(() => new SpeechSynthesisUtterance(), [])
  const voice = useReactiveVar(voiceVar)
  const rate = useReactiveVar(pronounceRateVar)
  const availableVoices = useReactiveVar(availableVoicesVar)

  const selectVoice = useCallback(
    (selectedVoice: SpeechSynthesisVoice | null) => {
      setLocalStorage('voice', selectedVoice?.name ?? '')
      voiceVar(selectedVoice)
    },
    []
  )

  const changeRate = useCallback((changedRate: number) => {
    setLocalStorage('pronounceRate', changedRate.toString())
    pronounceRateVar(changedRate)
  }, [])

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
