// import from libraries
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// import from this project
import { ApolloProvider } from 'components/providers/ApolloProvider'
import { ThemeProvider } from 'components/providers/ThemeProvider'
import { GlobalStyle } from 'components/GlobalStyle'
import { Home } from 'components/pages/Home'

const App = () => (
  <BrowserRouter>
    <ApolloProvider>
      <ThemeProvider>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </ThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
)

// eslint-disable-next-line import/no-default-export
export default App
