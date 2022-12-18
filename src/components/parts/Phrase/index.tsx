// import from libraries
import { useCallback, useState } from 'react'
import 'styled-components/macro'
import { RecordVoiceOver } from '@mui/icons-material'

// import from this project
import { Phrase as PhraseType } from 'types'
import { useStyle, usePronounciation } from 'hooks'
import { Text } from 'components/parts/Texts'
import { MarkdownDisplay } from 'components/parts/MarkdownDisplay'
import { createStyles } from './styles'

export type Props = {
  phrase: PhraseType
}

export const Phrase: React.FC<Props> = ({ phrase }) => {
  const { styles } = useStyle(createStyles)
  const [isShowJapanese, setIsShowJapanese] = useState<boolean>(false)

  const { pronouce, isSpeaking } = usePronounciation()

  const { phrase: english, japanese, pronunciation } = phrase

  const play = useCallback(() => {
    pronouce(pronunciation)
  }, [pronouce, pronunciation])

  return (
    <div css={styles.container}>
      <div>
        {!isSpeaking && (
          <button type='button' onClick={play}>
            <RecordVoiceOver />
          </button>
        )}
        <div>
          <MarkdownDisplay>{english}</MarkdownDisplay>
        </div>
        <div>
          {isShowJapanese ? (
            <Text>{japanese}</Text>
          ) : (
            <button type='button' onClick={() => setIsShowJapanese(true)}>
              訳を見る
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
