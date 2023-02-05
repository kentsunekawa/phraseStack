import * as Types from '../../types.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PublishProgressStatusMutationVariables = Types.Exact<{
  id?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type PublishProgressStatusMutation = { __typename?: 'Mutation', publishProgressStatus?: { __typename?: 'ProgressStatus', id: string, lastCursor?: string | null } | null };


export const PublishProgressStatusDocument = gql`
    mutation PublishProgressStatus($id: ID) {
  publishProgressStatus(where: {id: $id}) {
    id
    lastCursor
  }
}
    `;
export type PublishProgressStatusMutationFn = Apollo.MutationFunction<PublishProgressStatusMutation, PublishProgressStatusMutationVariables>;

/**
 * __usePublishProgressStatusMutation__
 *
 * To run a mutation, you first call `usePublishProgressStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishProgressStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishProgressStatusMutation, { data, loading, error }] = usePublishProgressStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePublishProgressStatusMutation(baseOptions?: Apollo.MutationHookOptions<PublishProgressStatusMutation, PublishProgressStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishProgressStatusMutation, PublishProgressStatusMutationVariables>(PublishProgressStatusDocument, options);
      }
export type PublishProgressStatusMutationHookResult = ReturnType<typeof usePublishProgressStatusMutation>;
export type PublishProgressStatusMutationResult = Apollo.MutationResult<PublishProgressStatusMutation>;
export type PublishProgressStatusMutationOptions = Apollo.BaseMutationOptions<PublishProgressStatusMutation, PublishProgressStatusMutationVariables>;