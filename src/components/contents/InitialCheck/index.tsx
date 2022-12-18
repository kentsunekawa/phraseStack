// import from libraries
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// import from this project
import {
  useCookies,
  setIsInitialChecked,
  setAccount,
  setVoice,
  setAvailableVoices,
} from 'hooks'
import { useGetAccountLazyQuery } from 'operations/queries/__generated__/GetAccount'

speechSynthesis.getVoices()

export const InitialCheck: React.FC = () => {
  const { cookies } = useCookies()
  const navigate = useNavigate()

  const [getAccount] = useGetAccountLazyQuery()

  useEffect(() => {
    if (cookies.accountId) {
      void getAccount({
        variables: {
          id: cookies.accountId,
        },
        onCompleted: (data) => {
          if (data.account) {
            setAccount(data.account)
            setIsInitialChecked(true)
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
  }, [navigate, cookies, getAccount])

  useEffect(() => {
    const ailableVoices = speechSynthesis
      .getVoices()
      .filter(({ lang }) => lang === 'en-US')

    setAvailableVoices(ailableVoices)

    if (cookies.voice) {
      setVoice(ailableVoices.find(({ name }) => name === cookies.voice) ?? null)
    }
  }, [cookies.voice])

  return <></>
}
