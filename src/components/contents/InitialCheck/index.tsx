// import from libraries
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// import from this project
import { useCookies, setIsInitialChecked, setAccount } from 'hooks'
import { useGetAccountLazyQuery } from 'operations/queries/__generated__/GetAccount'

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
            const { id, name } = data.account
            setAccount({ id, name })
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

  return <></>
}
