import { makeVar } from '@apollo/client'

import { Account } from 'types'

export const isInitialCheckedVar = makeVar<boolean>(false)

export const isLoadingVar = makeVar<boolean>(false)

export const accountVar = makeVar<Account | null>(null)

export const lastCursorVar = makeVar<string | null>(null)

export const speechSynthesisUtteranceVar = makeVar<SpeechSynthesisUtterance>(
  new SpeechSynthesisUtterance()
)

export const voiceVar = makeVar<SpeechSynthesisVoice | null>(null)

export const availableVoicesVar = makeVar<SpeechSynthesisVoice[]>([])
