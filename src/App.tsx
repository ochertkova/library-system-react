import { Button, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header/Header'
import BookInfo from './components/BookInfo/BookInfo'
import AddAuthor from './components/AddAuthor/AddAuthor'
import AddBook from './components/AddBook/AddBook'
import Catalog from './components/Catalog/Catalog'
import MyLoans from './components/MyLoans/MyLoans'
import SearchResult from './components/SearchResult/SearchResult'
import UpdateBook from './components/UpdateBook/UpdateBook'
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Typography component="span">
        <Routes>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/bookInfo/:id" element={<BookInfo />} />
          <Route path="/addAuthor" element={<AddAuthor />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/updateBook/:id" element={<UpdateBook />} />
          <Route path="/myLoans" element={<MyLoans />} />
          <Route path="/search/:searchText" element={<SearchResult />} />
          <Route path="/" element={<WelcomeScreen />} />
        </Routes>
      </Typography>
    </>
  )
}

export default App
