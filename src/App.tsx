import { Box, Button, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from './redux/store'
import { handleDecrement, handleIncrement } from './redux/actions/counter'
import './App.css'
import Header from './components/Header/Header'

function App() {
  const dispatch = useDispatch()
  const count = useSelector((state: RootState) => state.count)

  return (
    <Grid container direction="column">
      <Grid item container>
      <Header />
      </Grid>
      <Grid item container>
        <Grid item xs={0} sm={1} />
        <Grid item xs={12} sm={10}>
          Content
          </Grid>
        <Grid item xs={0} sm={1} />

        
      </Grid>
      <Grid item container>
          <Grid item xs={5}>
            <Button variant="contained" onClick={() => dispatch(handleIncrement())}>
              Increment
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Typography>{count}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Button variant="contained" onClick={() => dispatch(handleDecrement())}>
              Decrement
            </Button>
            </Grid>
        </Grid>
</Grid>
  )
}

export default App
