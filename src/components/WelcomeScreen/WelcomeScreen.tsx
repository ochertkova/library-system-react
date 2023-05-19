import { Box, Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { handleLogout } from '../../redux/actions/user'
import SignIn from '../Auth/SignIn'
import { RootState } from '../../redux/store'

function WelcomeScreen() {
  const dispatch = useDispatch()

  const { isAuthenticated, user } = useSelector((store: RootState) => store.user)

  return (
    <Typography component="div" textAlign={'center'}>
      <Box>
        <Box sx={{ p: 3 }}>
          <h3>Welcome to Library System{isAuthenticated && `, ${user.name}!`}</h3>
        </Box>
        {!isAuthenticated && (
          <Box sx={{ p: 3 }}>
            <SignIn />
          </Box>
        )}
        <Box
          sx={{
            flexGrow: 1,
            alignItems: 'center',
            display: { xs: 'flex', md: 'flex' },
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 3
          }}>
          {isAuthenticated && (
            <Button
              sx={{ width: { md: '400px', xs: 1 }, p: 2, m: 2 }}
              variant="contained"
              onClick={() => dispatch(handleLogout())}>
              Log out
            </Button>
          )}
        </Box>
      </Box>
    </Typography>
  )
}

export default WelcomeScreen
