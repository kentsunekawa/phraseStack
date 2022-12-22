// import from libraries
import 'styled-components/macro'
import { useState, useCallback, useMemo } from 'react'
import PuffLoader from 'react-spinners/PuffLoader'
import { Close } from '@mui/icons-material'
import { Button, IconButton } from '@mui/material'

// import from this project
import { useStyle, setLastCursor, useLastCursor } from 'hooks'
import { GetPagesConnectionQuery, PageInfo } from 'operations/types.d'
import { useGetPagesConnectionQuery } from 'operations/queries/__generated__/GetPagesConnection'
import { Modal } from 'components/parts/Modal'
import { Text } from 'components/parts/Texts'
import { createStyles } from './styles'

export type Props = {
  isOpen: boolean
  dismiss: () => void
}

export const Main: React.FC<Props> = ({ dismiss }) => {
  const { styles } = useStyle(createStyles)
  const { lastCursor } = useLastCursor()

  const [pageEdges, setPageEdges] = useState<
    GetPagesConnectionQuery['pagesConnection']['edges']
  >([])
  const [after, setAfter] = useState<string | null>(null)
  const [pageInfo, setPageInfo] = useState<PageInfo | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [aggregate, setAggregate] = useState<number | null>(null)

  const handleYes = useCallback(() => {
    if (selectedIndex !== null) {
      const cursor =
        selectedIndex === 0 ? null : pageEdges[selectedIndex - 1].cursor
      setLastCursor(cursor)
      dismiss()
    }
  }, [pageEdges, selectedIndex, dismiss])

  const loadMore = useCallback(() => {
    if (pageInfo && pageInfo.endCursor) {
      setIsLoading(true)
      setAfter(pageInfo.endCursor)
    }
  }, [pageInfo])

  const activeIndex = useMemo(() => {
    if (lastCursor) {
      const index = pageEdges.map(({ cursor }) => cursor).indexOf(lastCursor)

      return index !== -1 ? index + 1 : null
    }

    return null
  }, [lastCursor, pageEdges])

  useGetPagesConnectionQuery({
    variables: {
      after,
      first: 3,
    },
    onCompleted: (data) => {
      setAggregate(data.pagesConnection.aggregate.count)
      setPageEdges((prev) => [...prev, ...data.pagesConnection.edges])
      setPageInfo(data.pagesConnection.pageInfo)
      setIsLoading(false)
    },
  })

  return (
    <>
      <Modal open={selectedIndex !== null}>
        <Text>Do you start from this page?</Text>
        <Button onClick={() => setSelectedIndex(null)}>No</Button>
        <Button onClick={handleYes}>Yes</Button>
      </Modal>
      <div css={styles.container}>
        <IconButton onClick={dismiss} css={styles.closeButton}>
          <Close />
        </IconButton>
        <div css={styles.inner}>
          <div>
            {pageEdges.map(({ node, cursor }, i) => (
              <div key={cursor} css={styles.item}>
                {i === activeIndex ? (
                  <div css={styles.activeItem}>{node.title}</div>
                ) : (
                  <button
                    type='button'
                    onClick={() => setSelectedIndex(i)}
                    css={styles.pageItem}
                  >
                    {node.title}
                  </button>
                )}
              </div>
            ))}
            {aggregate && (
              <div css={styles.item}>
                <div css={styles.numItem}>
                  {pageEdges.length}/{aggregate}
                </div>
              </div>
            )}
            {isLoading ? (
              <div css={styles.item}>
                <div css={[styles.pageItem, styles.loading]}>
                  <PuffLoader size={40} />
                </div>
              </div>
            ) : (
              <>
                {pageInfo && pageInfo.hasNextPage && (
                  <Button onClick={loadMore} css={styles.pageItem}>
                    Load More
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const PageList: React.FC<Props> = (props) => {
  const { isOpen } = props
  if (!isOpen) return null

  return <Main {...props} />
}
