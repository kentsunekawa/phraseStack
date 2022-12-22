import 'styled-components/macro'
import { useCallback, useState, useMemo, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Description } from '@mui/icons-material'
import 'swiper/swiper.min.css'

// import from this project
import { useGetPagesConnectionQuery } from 'operations/queries/__generated__/GetPagesConnection'
import { useUpdateLastCursorMutation } from 'operations/mutations/__generated__/UpdateLastCursor'
import { usePublishProgressStatusMutation } from 'operations/mutations/__generated__/PublishProgressStatus'
import {
  useLastCursor,
  setLastCursor,
  setIsLoading,
  useStyle,
  useAccount,
  usePageNum,
} from 'hooks'
import { Frame } from 'components/contents/Frame'
import { PageSlide } from 'components/parts/PageSlide'
import { DoneSlide } from 'components/parts/DoneSlide'
import { DescriptionModal } from 'components/contents/DescriptionModal'
import { IconButton } from 'components/parts/IconButton'
import { createStyles } from './styles'

export const Home: React.FC = () => {
  const { styles } = useStyle(createStyles)

  const { account } = useAccount()

  const { lastCursor } = useLastCursor()
  const { pageNum } = usePageNum()
  const [isDone, setIsDone] = useState<boolean>(false)
  const [isOpenDescriptionModal, setIsOpenDescriptionModal] =
    useState<boolean>(false)
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
  })

  const [updateLastCursor] = useUpdateLastCursorMutation()
  const [publishProgressStatus] = usePublishProgressStatusMutation()

  const activePage = useMemo(
    () =>
      (data &&
        activeIndex !== null &&
        data.pagesConnection.edges[activeIndex]?.node) ??
      null,
    [data, activeIndex]
  )

  const pages = useMemo(
    () => data?.pagesConnection.edges.map(({ node }) => node) ?? null,
    [data]
  )
  const pageInfo = useMemo(() => data?.pagesConnection.pageInfo ?? null, [data])

  const doPublish = useCallback(() => {
    if (account && account.progressStatus) {
      void publishProgressStatus({
        variables: {
          id: account.progressStatus.id,
        },
        onError: () => {},
      })
    }
  }, [account, publishProgressStatus])

  const doUpdateLastCursor = useCallback(
    (cursor: string) => {
      if (account && account.progressStatus) {
        void updateLastCursor({
          variables: {
            id: account.progressStatus.id,
            lastCursor: cursor,
          },
          onCompleted: () => {
            doPublish()
          },
          onError: () => {},
        })
      }
    },
    [account, updateLastCursor, doPublish]
  )

  const handleChangeSlide = useCallback(
    (index: number) => {
      if (data) {
        const { edges } = data.pagesConnection
        if (index > edges.length - 1) {
          setIsDone(true)
        } else {
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
    <Frame>
      {!isDone &&
        activePage &&
        (!!activePage.description || !!activePage.references) && (
          <>
            <DescriptionModal
              open={isOpenDescriptionModal}
              onClose={() => setIsOpenDescriptionModal(false)}
              contents={{
                description: activePage.description,
                references: activePage.references,
              }}
            />
            <IconButton
              insertStyles={{ container: styles.descriptionButton }}
              onClick={() => setIsOpenDescriptionModal(true)}
              icon={<Description />}
            />
          </>
        )}
      <div>
        {pages !== null && (
          <>
            {pages.length < 1 ? (
              'no data'
            ) : (
              <Swiper
                onSlideChange={(swiper) =>
                  handleChangeSlide(swiper.activeIndex)
                }
                onInit={(swiper) => handleChangeSlide(swiper.activeIndex)}
              >
                {pages.map((page) => (
                  <SwiperSlide key={page.id}>
                    <PageSlide
                      page={page}
                      pageInfo={{
                        pageNum: activeIndex !== null ? activeIndex + 1 : '-',
                        maxNum: pageInfo?.pageSize ?? '-',
                      }}
                    />
                  </SwiperSlide>
                ))}
                <SwiperSlide>
                  <DoneSlide goNext={goNext} />
                </SwiperSlide>
              </Swiper>
            )}
          </>
        )}
      </div>
    </Frame>
  )
}
