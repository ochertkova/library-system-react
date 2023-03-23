import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ThemeProvider, createTheme } from '@mui/material'

import App from './App'
import './index.css'
import { store } from './redux/store'

const theme = createTheme({
  palette: {
    primary: {
      main:"#006d77"
    }
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme ={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
