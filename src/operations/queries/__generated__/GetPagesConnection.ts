import * as Types from '../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetPagesConnectionQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetPagesConnectionQuery = { __typename?: 'Query', pagesConnection: { __typename?: 'PageConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean, hasPreviousPage: boolean, pageSize?: number | null, startCursor?: string | null }, aggregate: { __typename?: 'Aggregate', count: number }, edges: Array<{ __typename?: 'PageEdge', cursor: string, node: { __typename?: 'Page', main?: string | null, description?: string | null, title: string, id: string, phrases: Array<{ __typename?: 'Phrase', japanese: string, phrase: string, id: string }> } }> } };


export const GetPagesConnectionDocument = gql`
    query GetPagesConnection($after: String, $first: Int) {
  pagesConnection(after: $after, first: $first) {
    pageInfo {
      endCursor
      hasNextPage
      hasPreviousPage
      pageSize
      startCursor
    }
    aggregate {
      count
    }
    edges {
      cursor
      node {
        main
        phrases {
          japanese
          phrase
          id
        }
        description
        title
        id
      }
    }
  }
}
    `;

/**
 * __useGetPagesConnectionQuery__
 *
 * To run a query within a React component, call `useGetPagesConnectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPagesConnectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPagesConnectionQuery({
 *   variables: {
 *      after: // value for 'after'
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetPagesConnectionQuery(baseOptions?: Apollo.QueryHookOptions<GetPagesConnectionQuery, GetPagesConnectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPagesConnectionQuery, GetPagesConnectionQueryVariables>(GetPagesConnectionDocument, options);
      }
export function useGetPagesConnectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPagesConnectionQuery, GetPagesConnectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPagesConnectionQuery, GetPagesConnectionQueryVariables>(GetPagesConnectionDocument, options);
        }
export type GetPagesConnectionQueryHookResult = ReturnType<typeof useGetPagesConnectionQuery>;
export type GetPagesConnectionLazyQueryHookResult = ReturnType<typeof useGetPagesConnectionLazyQuery>;
export type GetPagesConnectionQueryResult = Apollo.QueryResult<GetPagesConnectionQuery, GetPagesConnectionQueryVariables>;