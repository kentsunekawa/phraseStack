// import from libraries
import 'styled-components/macro'
import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// import from this project
import {
  useGetAccountsQuery,
  GetAccountsQuery,
} from 'operations/queries/__generated__/GetAccounts'
import { useStyle, setAccount, useCookies, setLastCursor } from 'hooks'
import { createStyles } from './styles'

type Account = GetAccountsQuery['accounts'][number]

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
    (account: Account) => {
      if (account) {
        setAccount(account)
        setCookie('accountId', account.id)
        setLastCursor(account.progressStatus?.lastCursor ?? null)
        navigate('/')
      }
    },
    [navigate, setCookie]
  )

  return (
    <div css={styles.container}>
      {accounts &&
        accounts.map((account) => (
          <button
            key={account.id}
            onClick={() => selectAccont(account)}
            type='button'
          >
            {account.name}
            {account.avatar?.url && (
              <img src={account.avatar.url} alt={account.name} />
            )}
          </button>
        ))}
    </div>
  )
}
