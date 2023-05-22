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
  Button,
  Link as MuiLink
} from '@mui/material'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { styled } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { handleLogout } from '../../redux/actions/user'
import { searchBooks } from '../../redux/actions/book'

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
const adminPages = [
  {
    label: 'Catalog',
    viewName: 'catalog',
    path: '/catalog'
  },
  {
    label: 'Add Author',
    viewName: 'addAuthor',
    path: '/addAuthor'
  },
  {
    label: 'Add Book',
    viewName: 'addBook',
    path: '/addBook'
  }
]
const userPages = [
  {
    label: 'Catalog',
    viewName: 'catalog',
    path: '/catalog'
  },
  {
    label: 'My Loans',
    viewName: 'myLoans',
    path: '/myLoans'
  }
]
const visitorPages = [
  {
    label: 'Catalog',
    viewName: 'catalog',
    path: '/catalog'
  }
]
const getPages = ({ isAuthenticated, loggedInUser: user }: UserState) => {
  if (!isAuthenticated) {
    return visitorPages
  }
  if (user?.role === 'ADMIN') {
    return adminPages
  }
  return userPages
}

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const userState = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [searchText, setSearchText] = React.useState<string>('')

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const onClickLogout = () => {
    handleCloseUserMenu()
    dispatch(handleLogout())
  }
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
                <Link
                  to={page.path}
                  key={page.label}
                  style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItem
                    onClick={() => {
                      handleCloseNavMenu()
                    }}>
                    <Typography textAlign="center">{page.label}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              Library System
            </Link>
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
              <Link
                to={page.path}
                key={page.label}
                style={{ textDecoration: 'none', color: 'black' }}>
                <Button
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu()
                  }}
                  sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page.label}
                </Button>
              </Link>
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
                    dispatch(searchBooks(searchText))
                    navigate('/search/' + searchText)
                  }
                }}
              />
            </Search>
          </Box>
          {userState.isAuthenticated && (
            <Box sx={{ flexGrow: 0, paddingLeft: 2 }}>
              <Typography>
                Logged in as
                <MuiLink sx={{ color: 'white', p: 1 }} onClick={handleOpenUserMenu}>
                  {userState.loggedInUser?.name}
                </MuiLink>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  <MenuItem onClick={onClickLogout}>
                    <Typography textAlign="center">Log out</Typography>
                  </MenuItem>
                </Menu>
                {userState.loggedInUser?.role === 'ADMIN' && (
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
