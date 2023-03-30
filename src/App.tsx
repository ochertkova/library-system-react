import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from './redux/store'
import Header from './components/Header/Header'
import { handleLogin, handleLogout } from './redux/actions/user'
import BookInfo from './components/BookInfo/BookInfo'
import AddAuthor from './components/AddAuthor/AddAuthor'
import AddBook from './components/AddBook/AddBook'
import Catalog from './components/Catalog/Catalog'
import MyLoans from './components/MyLoans/MyLoans'
import SearchResult from './components/SearchResult/SearchResult'
import UpdateBook from './components/UpdateBook/UpdateBook'

function WelcomeScreen() {
  return <Typography>Welcome to Library System</Typography>
}

function getContentComponent(activeView: string) {
  switch (activeView) {
    case 'catalog':
      return Catalog
    case 'bookInfo':
      return BookInfo
    case 'addAuthor':
      return AddAuthor
    case 'addBook':
      return AddBook
    case 'updateBook':
      return UpdateBook
    case 'myLoans':
      return MyLoans
    case 'search':
      return SearchResult
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
      <Typography component="span">
        <Content />
      </Typography>
    </>
  )
}

export default App
