// import from libraries
import 'styled-components/macro'

// import from this project
import { Page } from 'types'
import { useStyle } from 'hooks'
import { Heading } from 'components/parts/Texts'
import { Phrase } from 'components/parts/Phrase'
import { createStyles } from './styles'

export type Props = {
  page: Page
}

export const PageSlide: React.FC<Props> = ({ page }) => {
  const { styles } = useStyle(createStyles)

  const { title, phrases } = page

  return (
    <div css={styles.container}>
      <div css={styles.scrollArea}>
        <div css={styles.inner}>
          <div css={styles.title}>
            <Heading size='h5'>{title}</Heading>
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
