import React from 'react'
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  InputBase,
  alpha,
  Box,
  MenuItem,
  Menu,
  Button
} from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import MenuBookIcon from '@mui/icons-material/MenuBook'

import { styled } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { openView } from '../../redux/actions/view'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

const getPages = ({ isAuthenticated, user }: UserState) =>
  isAuthenticated
    ? user?.isAdmin
      ? [
          {
            label: 'Catalog',
            viewName: 'catalog'
          },
          {
            label: 'Add Author',
            viewName: 'addAuthor'
          },
          {
            label: 'Add Book',
            viewName: 'addBook'
          }
        ]
      : [
          {
            label: 'Catalog',
            viewName: 'catalog'
          },
          {
            label: 'My Loans',
            viewName: 'myLoans'
          }
        ]
    : [
        {
          label: 'Catalog',
          viewName: 'catalog'
        }
      ]

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const dispatch = useDispatch()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const userState = useSelector((state: RootState) => state.user)
  const [searchText, setSearchText] = React.useState<string>('')

  const pages = getPages(userState)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu()
                    dispatch(openView(page.viewName))
                  }}>
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Button variant="contained" onClick={(e) => dispatch(openView('welcomeScreen'))}>
              Library System
            </Button>
            <MenuBookIcon
              sx={{
                position: 'relative',
                top: '5px',
                paddingLeft: 1
              }}
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={() => {
                  handleCloseNavMenu()
                  dispatch(openView(page.viewName))
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page.label}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.code === 'Enter') {
                    setSearchText('')
                    dispatch(openView('search', { searchText }))
                  }
                }}
              />
            </Search>
          </Box>
          {userState.isAuthenticated && (
            <Box sx={{ flexGrow: 0, paddingLeft: 2 }}>
              <Typography>
                Logged in as {userState.user?.name}
                {userState.user?.isAdmin && (
                  <AdminPanelSettingsIcon
                    sx={{
                      position: 'relative',
                      top: '5px',
                      paddingLeft: 1
                    }}
                  />
                )}
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
