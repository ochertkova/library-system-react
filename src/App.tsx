import { Typography } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header/Header'
import BookInfo from './components/BookInfo/BookInfo'
import AddAuthor from './components/AddAuthor/AddAuthor'
import AddBook from './components/AddBook/AddBook'
import Catalog from './components/Catalog/Catalog'
import MyLoans from './components/MyLoans/MyLoans'
import SearchResult from './components/SearchResult/SearchResult'
import UpdateBook from './components/UpdateBook/UpdateBook'
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen'
import AddCategory from './components/AddCategory/AddCategory'
import withBook from './hoc/withBook'

function App() {
  const EnhancedBookInfo = withBook(BookInfo)
  const EnhancedUpdateBook = withBook(UpdateBook)

  return (
    <>
      <Header />
      <Typography component="span">
        <Routes>
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/bookInfo/:id" element={<EnhancedBookInfo />} />
          <Route path="/addAuthor" element={<AddAuthor />} />
          <Route path="/addCategory" element={<AddCategory />} />
          <Route path="/addBook" element={<AddBook />} />
          <Route path="/updateBook/:id" element={<EnhancedUpdateBook />} />
          <Route path="/myLoans" element={<MyLoans />} />
          <Route path="/search/:searchTextParam" element={<SearchResult />} />
          <Route path="/" element={<WelcomeScreen />} />
        </Routes>
      </Typography>
    </>
  )
}

export default App
