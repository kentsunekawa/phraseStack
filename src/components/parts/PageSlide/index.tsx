// import from libraries
import 'styled-components/macro'

// import from this project
import { Page } from 'types'
import { useStyle, useFixWindowHeight } from 'hooks'
import { Text } from 'components/parts/Texts'
import { Phrase } from 'components/parts/Phrase'
import { PageProgress } from 'components/parts/PageProgress'
import { createStyles } from './styles'

export type Props = {
  page: Page
  pageInfo: {
    pageNum: number | string
    maxNum: number | string
  }
}

export const PageSlide: React.FC<Props> = ({ page, pageInfo }) => {
  const { styles } = useStyle(createStyles)
  const { wrapperRef } = useFixWindowHeight()

  const { title, phrases } = page

  return (
    <div css={styles.container} ref={wrapperRef}>
      <div css={styles.scrollArea}>
        <div css={styles.inner}>
          <div css={styles.titleArea}>
            <div css={styles.progress}>
              <PageProgress pageInfo={pageInfo} />
            </div>
            <div css={styles.title}>
              <Text size='large'>{title}</Text>
            </div>
          </div>
          <div>
            {phrases.map((phrase) => (
              <div key={phrase.id}>
                <Phrase phrase={phrase} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
