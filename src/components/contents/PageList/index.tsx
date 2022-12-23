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

export const PageList: React.FC<Props> = ({ dismiss, isOpen }) => {
  const { styles, theme } = useStyle(createStyles)
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
    setSelectedIndex(null)
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
      first: 20,
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
      <Modal
        open={selectedIndex !== null}
        title='Do you start from this page?'
        onClose={() => setSelectedIndex(null)}
        actions={[
          {
            label: 'No',
            action: () => setSelectedIndex(null),
          },
          {
            label: 'Yes',
            action: handleYes,
          },
        ]}
      />
      <Modal fullScreen open={isOpen} onClose={dismiss}>
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
                  <PuffLoader size={40} color={theme.palette.primary.main} />
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
      </Modal>
    </>
  )
}
