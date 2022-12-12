// import from libraries
import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const cache = new InMemoryCache()

type Props = {
  children: React.ReactNode
}

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_API_URL,
})

const authLink = setContext(() => ({
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_API_ACCESS_TOKEN ?? ''}`,
  },
}))

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})

export const ApolloProvider: React.FC<Props> = ({ children }) => (
  <Provider client={client}>{children}</Provider>
)
