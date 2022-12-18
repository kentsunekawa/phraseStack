import 'styled-components/macro'
import { useCallback, useState, useMemo, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Description } from '@mui/icons-material'
import 'swiper/swiper.min.css'

// import from this project
import { useGetPagesConnectionQuery } from 'operations/queries/__generated__/GetPagesConnection'
import { useLastCursor, setLastCursor, setIsLoading, useStyle } from 'hooks'
import { PageSlide } from 'components/parts/PageSlide'
import { DescriptionModal } from 'components/contents/DescriptionModal'
import { IconButton } from 'components/parts/IconButton'
import { createStyles } from './styles'

export const Home: React.FC = () => {
  const { styles } = useStyle(createStyles)

  const { lastCursor } = useLastCursor()
  const [isDone, setIsDone] = useState<boolean>(false)
  const [isOpenDescriptionModal, setIsOpenDescriptionModal] =
    useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [currentCursor, setCurrentCursor] = useState<string | null>(lastCursor)

  const { data } = useGetPagesConnectionQuery({
    variables: {
      after: lastCursor,
    },
    onCompleted: () => {
      setIsDone(false)
      setIsLoading(false)
    },
  })

  const activePage = useMemo(
    () =>
      (data &&
        activeIndex !== null &&
        data.pagesConnection.edges[activeIndex]?.node) ??
      null,
    [data, activeIndex]
  )

  const handleChangeSlide = useCallback(
    (index: number) => {
      if (data) {
        setActiveIndex(index)
        const { edges } = data.pagesConnection
        const pageConnection = edges[index]
        if (pageConnection) setCurrentCursor(pageConnection.cursor)
        if (index > edges.length - 1) setIsDone(true)
      }
    },
    [data]
  )

  const goNext = useCallback(() => {
    setIsLoading(true)
    setLastCursor(currentCursor)
  }, [currentCursor])

  useEffect(() => {
    setIsLoading(true)
  }, [])

  return (
    <>
      {!isDone && activePage && (
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
        {data && (
          <>
            {data.pagesConnection.edges.length < 1 ? (
              'no data'
            ) : (
              <Swiper
                allowSlidePrev={false}
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
    </>
  )
}
