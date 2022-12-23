// import from libraries
import 'styled-components/macro'

// import from this project
import { Page } from 'types'
import { useStyle, useFixWindowHeight } from 'hooks'
import { Text } from 'components/parts/Texts'
import { Phrase } from 'components/parts/Phrase'
import { createStyles } from './styles'

export type Props = {
  page: Page
}

export const PageSlide: React.FC<Props> = ({ page }) => {
  const { styles } = useStyle(createStyles)
  const { wrapperRef } = useFixWindowHeight()

  const { title, phrases } = page

  return (
    <div css={styles.container} ref={wrapperRef}>
      <div css={styles.scrollArea}>
        <div css={styles.inner}>
          <div css={styles.titleArea}>
            <Text size='large' weight='bold' css={styles.title}>
              {title}
            </Text>
          </div>
          <div css={styles.phrasesArea}>
            {phrases.map((phrase) => (
              <div key={phrase.id} css={styles.phraseItem}>
                <Phrase phrase={phrase} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
