import { makeVar } from '@apollo/client'

import { Account as AccountType } from 'operations/types.d'

export type Account = Pick<AccountType, 'id' | 'name'>

export const isInitialCheckedVar = makeVar<boolean>(false)

export const accountVar = makeVar<null | Account>(null)
