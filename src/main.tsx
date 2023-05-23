import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider, useDispatch } from 'react-redux'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

import App from './App'
import { store } from './redux/store'
import { initUser } from './redux/actions/user'

const theme = createTheme({
  palette: {
    primary: {
      main: '#006d77'
    },
    action: {}
  }
})

if (window.localStorage.getItem('loggedInLibraryUser') != null) {
  store.dispatch(initUser())
}

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
