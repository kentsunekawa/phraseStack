import { useEffect, useCallback, useRef } from 'react'

export const useFixWindowHeight = (
  isMounted = true,
  offset = 0
): {
  wrapperRef: React.RefObject<HTMLDivElement>
} => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const setHeight = useCallback(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.height = `${window.innerHeight - offset}px`
    }
  }, [offset])

  useEffect(() => {
    if (isMounted) {
      setHeight()
      window.addEventListener('resize', setHeight)
    }

    return () => {
      window.removeEventListener('resize', setHeight)
    }
  }, [isMounted, setHeight])

  return { wrapperRef }
}
