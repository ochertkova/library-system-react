import { Box, Button, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from './redux/store'
import { handleDecrement, handleIncrement } from './redux/actions/counter'
import Header from './components/Header/Header'
import { handleLogin, handleLogout } from './redux/actions/user'
import ContentTable from './components/ContentTable/ContentTable'

function App() {
  const dispatch = useDispatch()
  const count = useSelector((state: RootState) => state.count)

  console.log(`App sees state ${count}`)
  return (
    <>
      <Header />
      <ContentTable />
    </>
  )
}

export default App
