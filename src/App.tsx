// import from libraries
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

// import from this project
import { useInitialCheck } from 'hooks'
import { ApolloProvider } from 'components/providers/ApolloProvider'
import { ThemeProvider } from 'components/providers/ThemeProvider'
import { GlobalStyle } from 'components/GlobalStyle'
import { Home } from 'components/pages/Home'
import { Accounts } from 'components/pages/Accounts'
import { InitialCheck } from 'components/contents/InitialCheck'
import { FlashScreen } from 'components/contents/FlashScreen'

const App = () => {
  const { isInitialChecked } = useInitialCheck()

  return (
    <CookiesProvider>
      <BrowserRouter>
        <ApolloProvider>
          <ThemeProvider>
            <GlobalStyle />
            {!isInitialChecked ? (
              <>
                <InitialCheck />
                <FlashScreen />
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
    </CookiesProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
