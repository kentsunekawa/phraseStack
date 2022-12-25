// import from libraries
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// import from this project
import { useInitialCheck } from 'hooks'
import { ApolloProvider } from 'components/providers/ApolloProvider'
import { ThemeProvider } from 'components/providers/ThemeProvider'
import { GlobalStyle } from 'components/GlobalStyle'
import { Home } from 'components/pages/Home'
import { Accounts } from 'components/pages/Accounts'
import { InitialCheck } from 'components/contents/InitialCheck'
import { SplashScreen } from 'components/contents/SplashScreen'
import { Loading } from 'components/contents/Loading'

const App = () => {
  const { isInitialChecked } = useInitialCheck()

  return (
    <BrowserRouter>
      <ApolloProvider>
        <ThemeProvider>
          <GlobalStyle />
          <Loading />
          {!isInitialChecked ? (
            <>
              <InitialCheck />
              <SplashScreen />
            </>
          ) : (
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/accounts' element={<Accounts />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          )}
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
