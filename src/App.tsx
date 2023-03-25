import { Box, Button, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from './redux/store'
import { handleDecrement, handleIncrement } from './redux/actions/counter'
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
  const count = useSelector((state: RootState) => state.count)

  const { activeView } = useSelector((state: RootState) => state.view)

  const Content = getContentComponent(activeView)
  return (
    <>
      <Header />
      <Button onClick={() => dispatch(handleLogin(1))}>Log in</Button>
      <Button onClick={() => dispatch(handleLogin(2))}>Log in a admin</Button>

      <Button onClick={() => dispatch(handleLogout())}>Log out</Button>
      <Content />
      <Grid container direction="column">
        <Grid item container direction="row"></Grid>
        <Grid item container>
          <Grid item xs={0} sm={1} />
          <Grid item xs={0} sm={1} />
        </Grid>
        <Grid item container>
          <Grid item xs={5}>
            <Button variant="contained" onClick={() => dispatch(handleIncrement())}>
              Increment
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h3">{count}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Button variant="contained" onClick={() => dispatch(handleDecrement())}>
              Decrement
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default App
