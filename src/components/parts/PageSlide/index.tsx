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
  pageInfo: {
    pageNum: number | string
    maxNum: number | string
  }
}

export const PageSlide: React.FC<Props> = ({
  page,
  pageInfo: { pageNum, maxNum },
}) => {
  const { styles } = useStyle(createStyles)
  const { wrapperRef } = useFixWindowHeight()

  const { title, phrases } = page

  return (
    <div css={styles.container} ref={wrapperRef}>
      <div css={styles.scrollArea}>
        <div css={styles.inner}>
          <div css={styles.title}>
            <div>
              <span>{pageNum}</span>/<span>{maxNum}</span>
            </div>
            <Text size='large'>{title}</Text>
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
