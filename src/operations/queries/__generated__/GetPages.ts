import * as Types from '../../types.d'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type GetPagesQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetPagesQuery = {
  __typename?: 'Query'
  pages: Array<{
    __typename?: 'Page'
    description?: string | null
    references?: string | null
    phrases: Array<{
      __typename?: 'Phrase'
      id: string
      phrase: string
      pronunciation: string
      japanese: string
    }>
  }>
}

export const GetPagesDocument = gql`
  query GetPages {
    pages {
      phrases {
        id
        phrase
        pronunciation
        japanese
      }
      description
      references
    }
  }
`

/**
 * __useGetPagesQuery__
 *
 * To run a query within a React component, call `useGetPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPagesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPagesQuery, GetPagesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPagesQuery, GetPagesQueryVariables>(
    GetPagesDocument,
    options
  )
}
export function useGetPagesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPagesQuery,
    GetPagesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPagesQuery, GetPagesQueryVariables>(
    GetPagesDocument,
    options
  )
}
export type GetPagesQueryHookResult = ReturnType<typeof useGetPagesQuery>
export type GetPagesLazyQueryHookResult = ReturnType<
  typeof useGetPagesLazyQuery
>
export type GetPagesQueryResult = Apollo.QueryResult<
  GetPagesQuery,
  GetPagesQueryVariables
>
