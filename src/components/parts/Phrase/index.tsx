// import from libraries
import { useState } from 'react'
import 'styled-components/macro'
import { RecordVoiceOver, KeyboardArrowRight } from '@mui/icons-material'
import { IconButton, Button } from '@mui/material'

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
  const { styles, theme } = useStyle(createStyles)
  const [isShowJapanese, setIsShowJapanese] = useState<boolean>(false)

  const { isSpeaking, pronounce } = usePronounciation()
  const { phrase: english, japanese, pronunciation } = phrase

  return (
    <div css={styles.container}>
      <IconButton
        onClick={() => pronounce(pronunciation)}
        disabled={isSpeaking}
        css={styles.pronounceButton}
      >
        <RecordVoiceOver />
      </IconButton>
      <div css={styles.phrase}>
        <MarkdownDisplay>{english}</MarkdownDisplay>
      </div>
      <div css={styles.jpArea.container}>
        {isShowJapanese ? (
          <Text>{japanese}</Text>
        ) : (
          <Button
            onClick={() => setIsShowJapanese(true)}
            variant='text'
            size='small'
            endIcon={<KeyboardArrowRight />}
            css={styles.jpArea.button}
          >
            See Japanese
          </Button>
        )}
      </div>
    </div>
  )
}
