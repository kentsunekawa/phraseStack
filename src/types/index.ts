import { CSSProp } from 'styled-components'

import { GetAccountQuery, GetPagesConnectionQuery } from 'operations/types.d'

export type Account = Omit<
  NonNullable<GetAccountQuery['account']>,
  'progressStatus'
>

export type InsertStyles<T extends string> = {
  [k in T]?: CSSProp
}

export type Page =
  GetPagesConnectionQuery['pagesConnection']['edges'][number]['node']

export type Phrase = Page['phrases'][number]
