// import from libraries
import 'styled-components/macro'
import { useCallback } from 'react'
import { Button } from '@mui/material'

// import from this project
import {
  useStyle,
  useFixWindowHeight,
  useUpdateLastCursor,
  useAccount,
  setLastCursor,
  setIsLoading,
} from 'hooks'
import { Heading, Text } from 'components/parts/Texts'
import { createStyles } from './styles'

// export type Props = {

// }

export const NoData: React.FC = () => {
  const { styles } = useStyle(createStyles)
  const { wrapperRef } = useFixWindowHeight()
  const { account } = useAccount()
  const { updateLastCursor } = useUpdateLastCursor()

  const backToFirst = useCallback(() => {
    if (account?.progressStatus) {
      setIsLoading(true)
      updateLastCursor(account?.progressStatus.id, null)
      setLastCursor(null)
    }
  }, [account, updateLastCursor])

  return (
    <div css={styles.container} ref={wrapperRef}>
      <div css={styles.main}>
        <Heading size='h3' align='center' css={styles.text}>
          Congratulations!!
        </Heading>
        <Text
          align='center'
          size='large'
          css={styles.text}
        >{`You've completed.`}</Text>
        <Button
          onClick={backToFirst}
          size='large'
          variant='outlined'
          css={styles.button}
        >
          Start from first
        </Button>
      </div>
    </div>
  )
}
