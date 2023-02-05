// import from libraries
import 'styled-components/macro'
import { useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

// import from this project
import {
  useGetAccountsQuery,
  GetAccountsQuery,
} from 'operations/queries/__generated__/GetAccounts'
import { useStyle, setAccount, setLastCursor } from 'hooks'
import { UserBox } from 'components/parts/UserBox'
import { createStyles } from './styles'

type Account = GetAccountsQuery['accounts'][number]

export const Accounts: React.FC = () => {
  const { styles } = useStyle(createStyles)
  const navigate = useNavigate()

  const { data: getAccountsData } = useGetAccountsQuery()

  const accounts = useMemo(
    () => getAccountsData?.accounts ?? null,
    [getAccountsData]
  )

  const selectAccont = useCallback(
    (account: Account) => {
      if (account) {
        setAccount(account)
        localStorage.setItem('accountId', account.id)
        setLastCursor(account.progressStatus?.lastCursor ?? null)
        navigate('/')
      }
    },
    [navigate]
  )

  return (
    <div css={styles.container}>
      <div css={styles.list}>
        {accounts &&
          accounts.map((account) => (
            <div key={account.id} css={styles.item}>
              <button
                onClick={() => selectAccont(account)}
                type='button'
                css={styles.button}
              >
                <UserBox name={account.name} url={account.avatar?.url} />
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}
