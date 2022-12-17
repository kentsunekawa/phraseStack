// import from libraries
import 'styled-components/macro'
import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// import from this project
import { useGetAccountsQuery } from 'operations/queries/__generated__/GetAccounts'
import { useStyle, setAccount, useCookies } from 'hooks'
import { createStyles } from './styles'

export const Accounts: React.FC = () => {
  const { styles } = useStyle(createStyles)
  const navigate = useNavigate()
  const { setCookie } = useCookies()

  const { data: getAccountsData } = useGetAccountsQuery()

  const accounts = useMemo(
    () => getAccountsData?.accounts ?? null,
    [getAccountsData]
  )

  const selectAccont = useCallback(
    (id: string, name: string) => {
      setAccount({ id, name })
      setCookie('accountId', id)
      navigate('/')
    },
    [navigate, setCookie]
  )

  return (
    <div css={styles.container}>
      {accounts &&
        accounts.map(({ id, name, avatar }) => (
          <button key={id} onClick={() => selectAccont(id, name)} type='button'>
            {name}
            {avatar?.url && <img src={avatar.url} alt={name} />}
          </button>
        ))}
    </div>
  )
}
