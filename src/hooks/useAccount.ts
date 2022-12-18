import { useReactiveVar } from '@apollo/client'

import { Account } from 'types'
import { accountVar } from 'cache'

export const setAccount = (account: Account) => accountVar(account)

export const useAccount = () => {
  const account = useReactiveVar(accountVar)

  return { account }
}
