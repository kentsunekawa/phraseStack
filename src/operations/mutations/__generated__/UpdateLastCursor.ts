import * as Types from '../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateLastCursorMutationVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['ID']>;
  lastCursor?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UpdateLastCursorMutation = { __typename?: 'Mutation', updateProgressStatus?: { __typename?: 'ProgressStatus', id: string, lastCursor?: string | null } | null };


export const UpdateLastCursorDocument = gql`
    mutation UpdateLastCursor($id: ID, $lastCursor: String) {
  updateProgressStatus(data: {lastCursor: $lastCursor}, where: {id: $id}) {
    id
    lastCursor
  }
}
    `;
export type UpdateLastCursorMutationFn = Apollo.MutationFunction<UpdateLastCursorMutation, UpdateLastCursorMutationVariables>;

/**
 * __useUpdateLastCursorMutation__
 *
 * To run a mutation, you first call `useUpdateLastCursorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLastCursorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLastCursorMutation, { data, loading, error }] = useUpdateLastCursorMutation({
 *   variables: {
 *      id: // value for 'id'
 *      lastCursor: // value for 'lastCursor'
 *   },
 * });
 */
export function useUpdateLastCursorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLastCursorMutation, UpdateLastCursorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLastCursorMutation, UpdateLastCursorMutationVariables>(UpdateLastCursorDocument, options);
      }
export type UpdateLastCursorMutationHookResult = ReturnType<typeof useUpdateLastCursorMutation>;
export type UpdateLastCursorMutationResult = Apollo.MutationResult<UpdateLastCursorMutation>;
export type UpdateLastCursorMutationOptions = Apollo.BaseMutationOptions<UpdateLastCursorMutation, UpdateLastCursorMutationVariables>;