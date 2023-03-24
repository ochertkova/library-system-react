import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material'

import App from './App'
import { store } from './redux/store'

const theme = createTheme({
  palette: {
    primary: {
      main: '#006d77'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
