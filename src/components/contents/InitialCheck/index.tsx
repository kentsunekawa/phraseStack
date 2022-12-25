// import from libraries
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// import from this project
import { getLocalStorageItem } from 'utils'
import {
  setIsInitialChecked,
  setAccount,
  setVoice,
  setRate,
  setAvailableVoices,
  setLastCursor,
  setPageNum,
} from 'hooks'
import { useGetAccountLazyQuery } from 'operations/queries/__generated__/GetAccount'

speechSynthesis.getVoices()

export const InitialCheck: React.FC = () => {
  const navigate = useNavigate()

  const [getAccount] = useGetAccountLazyQuery()

  useEffect(() => {
    const accountId = getLocalStorageItem('accountId')
    if (accountId) {
      void getAccount({
        variables: {
          id: accountId,
        },
        onCompleted: (data) => {
          if (data.account) {
            setAccount(data.account)
            setIsInitialChecked(true)
            setLastCursor(data.account.progressStatus?.lastCursor ?? null)
            navigate('/')
          }
        },
        onError: () => {
          setIsInitialChecked(true)
          navigate('/accounts')
        },
      })
    } else {
      setIsInitialChecked(true)
      navigate('/accounts')
    }
  }, [navigate, getAccount])

  useEffect(() => {
    const voice = getLocalStorageItem('voice')
    const pronounceRate = getLocalStorageItem('pronounceRate')
    const ailableVoices = speechSynthesis
      .getVoices()
      .filter(({ lang }) => lang === 'en-US')

    setAvailableVoices(ailableVoices)

    if (voice) {
      setVoice(ailableVoices.find(({ name }) => name === voice) ?? null)
    }
    if (pronounceRate) {
      setRate(Number(pronounceRate))
    }
  }, [])

  useEffect(() => {
    const pageNum = getLocalStorageItem('pageNum')
    if (pageNum) {
      setPageNum(Number(pageNum))
    }
  }, [])

  return <></>
}
