import { Box, Button, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'

import { handleLogin, handleLogout } from '../../redux/actions/user'

function WelcomeScreen() {
  const dispatch = useDispatch()

  return (
    <Typography component="div" textAlign={'center'}>
      <Box>
        <Box sx={{ p: 3 }}>Welcome to Library System</Box>
        <Box
          sx={{
            flexGrow: 1,
            alignItems: 'center',
            display: { xs: 'flex', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 3
          }}>
          <Button
            sx={{ width: { md: '400px', xs: 1 }, p: 2, m: 2 }}
            variant="contained"
            onClick={() => dispatch(handleLogin(1))}>
            Log in as User
          </Button>
          <Button
            sx={{ width: { md: '400px', xs: 1 }, p: 2, m: 2 }}
            variant="contained"
            onClick={() => dispatch(handleLogin(2))}>
            Log in as Admin
          </Button>
          <Button
            sx={{ width: { md: '400px', xs: 1 }, p: 2, m: 2 }}
            variant="contained"
            onClick={() => dispatch(handleLogout())}>
            Log out
          </Button>
        </Box>
      </Box>
    </Typography>
  )
}

export default WelcomeScreen
