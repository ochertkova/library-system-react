import { Box, Button, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from './redux/store'
import Header from './components/Header/Header'
import { handleLogin, handleLogout } from './redux/actions/user'
import ContentTable from './components/ContentTable/ContentTable'
import BookInfo from './components/BookInfo/BookInfo'

function WelcomeScreen() {
  return <Typography>Welcome to Library System</Typography>
}

function getContentComponent(activeView: string) {
  switch (activeView) {
    case 'catalog':
      return ContentTable
    case 'bookinfo':
      return BookInfo
    default:
      return WelcomeScreen
  }
}

function App() {
  const dispatch = useDispatch()

  const { activeView } = useSelector((state: RootState) => state.view)

  const Content = getContentComponent(activeView)
  return (
    <>
      <Header />
      <Button onClick={() => dispatch(handleLogin(1))}>Log in</Button>
      <Button onClick={() => dispatch(handleLogin(2))}>Log in a admin</Button>
      <Button onClick={() => dispatch(handleLogout())}>Log out</Button>
      <Content />
    </>
  )
}

export default App
