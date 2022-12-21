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
} from 'hooks'
import { Frame } from 'components/contents/Frame'
import { PageSlide } from 'components/parts/PageSlide'
import { DescriptionModal } from 'components/contents/DescriptionModal'
import { IconButton } from 'components/parts/IconButton'
import { createStyles } from './styles'

export const Home: React.FC = () => {
  const { styles } = useStyle(createStyles)

  const { account } = useAccount()

  const [isEnable, setIsEnable] = useState<boolean>(false)
  const { lastCursor } = useLastCursor()
  const [isDone, setIsDone] = useState<boolean>(false)
  const [isOpenDescriptionModal, setIsOpenDescriptionModal] =
    useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [currentCursor, setCurrentCursor] = useState<string | null>(lastCursor)

  const { data } = useGetPagesConnectionQuery({
    variables: {
      after: lastCursor || null,
      first: 3,
    },
    onCompleted: () => {
      setIsDone(false)
      setIsLoading(false)
      setIsEnable(true)
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

  const pageInfo = useMemo(() => data?.pagesConnection.pageInfo ?? null, [data])

  const doPublish = useCallback(() => {
    if (account && account.progressStatus) {
      void publishProgressStatus({
        variables: {
          id: account.progressStatus.id,
        },
        onCompleted: () => {
          setIsEnable(true)
        },
      })
    }
  }, [account, publishProgressStatus])

  const doUpdateLastCursor = useCallback(
    (cursor: string) => {
      if (account && account.progressStatus) {
        setIsEnable(false)
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
        setActiveIndex(index)

        const { edges } = data.pagesConnection
        if (index > edges.length - 1) {
          setIsDone(true)
        } else {
          const page = edges[index]
          if (page) {
            setCurrentCursor(page.cursor)
          }
          if (index > 0) {
            const prevPage = edges[index - 1]
            doUpdateLastCursor(prevPage.cursor)
          }
        }
      }
    },
    [data, doUpdateLastCursor]
  )

  const goNext = useCallback(() => {
    setIsLoading(true)
    setLastCursor(currentCursor)
    setActiveIndex(null)
  }, [currentCursor])

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
        {!isDone && (
          <div>
            <span>{activeIndex !== null ? activeIndex + 1 : '-'}</span>/
            <span>{pageInfo?.pageSize ?? '-'}</span>
          </div>
        )}
        {data && (
          <>
            {data.pagesConnection.edges.length < 1 ? (
              'no data'
            ) : (
              <Swiper
                allowSlideNext={isEnable}
                allowSlidePrev={isEnable}
                onSlideChange={(swiper) =>
                  handleChangeSlide(swiper.activeIndex)
                }
                onInit={(swiper) => handleChangeSlide(swiper.activeIndex)}
              >
                {data.pagesConnection.edges.map(({ node }) => (
                  <SwiperSlide key={node.id}>
                    <PageSlide page={node} />
                  </SwiperSlide>
                ))}
                <SwiperSlide>
                  <button type='button' onClick={goNext}>
                    続ける
                  </button>
                </SwiperSlide>
              </Swiper>
            )}
          </>
        )}
      </div>
    </Frame>
  )
}
