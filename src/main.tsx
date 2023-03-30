import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material'

import App from './App'
import { store } from './redux/store'
import { initBooks } from './redux/actions/book'
import { BrowserRouter } from 'react-router-dom'

const theme = createTheme({
  palette: {
    primary: {
      main: '#006d77'
    },
    action: {}
  }
})

store.dispatch(initBooks())

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
