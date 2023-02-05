import 'styled-components/macro'
import { useCallback, useState, useMemo, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Description, List } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import 'swiper/swiper.min.css'

// import from this project
import { useGetPagesConnectionQuery } from 'operations/queries/__generated__/GetPagesConnection'
import {
  useLastCursor,
  setLastCursor,
  setIsLoading,
  useStyle,
  useAccount,
  usePageNum,
  useUpdateLastCursor,
} from 'hooks'
import { Frame } from 'components/contents/Frame'
import { PageList } from 'components/contents/PageList'
import { PageSlide } from 'components/parts/PageSlide'
import { DoneSlide } from 'components/parts/DoneSlide'
import { NoData } from 'components/parts/NoData'
import { DescriptionModal } from 'components/contents/DescriptionModal'
import { ProgressBar } from 'components/parts/ProgressBar'
import { createStyles } from './styles'

export const Home: React.FC = () => {
  const { styles } = useStyle(createStyles)

  const { account } = useAccount()

  const { lastCursor } = useLastCursor()
  const { pageNum } = usePageNum()
  const [isDone, setIsDone] = useState<boolean>(false)
  const [isOpenDescriptionModal, setIsOpenDescriptionModal] =
    useState<boolean>(false)
  const [isOpenPageList, setIsOpenPageList] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [currentCursor, setCurrentCursor] = useState<string | null>(lastCursor)

  const { data } = useGetPagesConnectionQuery({
    variables: {
      after: lastCursor || null,
      first: pageNum,
    },
    onCompleted: () => {
      setIsDone(false)
      setIsLoading(false)
    },
    fetchPolicy: 'no-cache',
  })

  const { updateLastCursor } = useUpdateLastCursor()

  const activePage = useMemo(
    () =>
      data && activeIndex !== null
        ? data.pagesConnection.edges[activeIndex]?.node
        : null,
    [data, activeIndex]
  )

  const pages = useMemo(
    () => data?.pagesConnection.edges.map(({ node }) => node) ?? null,
    [data]
  )
  const pageInfo = useMemo(() => data?.pagesConnection.pageInfo ?? null, [data])

  const doUpdateLastCursor = useCallback(
    (cursor: string) => {
      if (account?.progressStatus) {
        updateLastCursor(account.progressStatus.id, cursor)
      }
    },
    [account, updateLastCursor]
  )

  const handleChangeSlide = useCallback(
    (index: number) => {
      if (data) {
        const { edges } = data.pagesConnection
        if (index > edges.length - 1) {
          setIsDone(true)
        } else {
          setIsDone(false)
          setActiveIndex(index)
          const page = edges[index]
          if (page) {
            setCurrentCursor(page.cursor)
          }
        }
      }
    },
    [data]
  )

  const goNext = useCallback(() => {
    if (data && activeIndex !== null) {
      doUpdateLastCursor(data.pagesConnection.edges[activeIndex].cursor)
    }

    setIsLoading(true)
    setLastCursor(currentCursor)
    setActiveIndex(null)
  }, [doUpdateLastCursor, data, activeIndex, currentCursor])

  useEffect(() => {
    setIsLoading(true)
  }, [])

  return (
    <>
      <PageList
        isOpen={isOpenPageList}
        dismiss={() => setIsOpenPageList(false)}
      />
      <div css={[isOpenPageList && styles.hide]}>
        <Frame>
          <div css={styles.overlay} />
          {!isDone && activePage && !!activePage.description && (
            <>
              <DescriptionModal
                open={isOpenDescriptionModal}
                dismiss={() => setIsOpenDescriptionModal(false)}
                contents={{
                  description: activePage?.description,
                }}
              />
              <IconButton
                css={styles.descriptionButton}
                onClick={() => setIsOpenDescriptionModal(true)}
              >
                <Description />
              </IconButton>
            </>
          )}
          <IconButton
            css={styles.listButton}
            onClick={() => setIsOpenPageList(true)}
          >
            <List />
          </IconButton>

          {pages !== null && pageInfo && (
            <>
              <div css={styles.progressBar}>
                <ProgressBar
                  max={pageInfo?.pageSize ?? null}
                  current={activeIndex !== null ? activeIndex + 1 : null}
                />
              </div>
              <Swiper
                onSlideChange={(swiper) =>
                  handleChangeSlide(swiper.activeIndex)
                }
                onInit={(swiper) => handleChangeSlide(swiper.activeIndex)}
              >
                {pages.map((page) => (
                  <SwiperSlide key={page.id}>
                    <PageSlide page={page} />
                  </SwiperSlide>
                ))}
                {pageInfo.hasNextPage ? (
                  <SwiperSlide>
                    <DoneSlide goNext={goNext} />
                  </SwiperSlide>
                ) : (
                  <SwiperSlide>
                    <NoData />
                  </SwiperSlide>
                )}
              </Swiper>
            </>
          )}
        </Frame>
      </div>
    </>
  )
}
