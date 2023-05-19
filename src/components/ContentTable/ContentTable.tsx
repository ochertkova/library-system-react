import React from 'react'
import {
  Box,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material'
import BookIcon from '@mui/icons-material/Book'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getBookById } from '../../redux/actions/book'
import { AppDispatch } from '../../redux/store'

interface Column {
  id: 'bookCoverLink' | 'isbn' | 'title' | 'authors' | 'status'
  label: string
  minWidth?: number
  align?: 'right'
  sx?: SxProps
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  {
    id: 'bookCoverLink',
    label: 'Cover',
    minWidth: 170,
    sx: { display: { xs: 'none', md: 'block' } }
  },
  { id: 'isbn', label: 'ISBN', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 100 },
  { id: 'authors', label: 'Authors', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 }
]

interface ContentTableProps {
  books: Book[]
}

export default function ContentTable({ books }: ContentTableProps) {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    event?.preventDefault()
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const rows = books
  return (
    <Paper sx={{ width: '100%', overflow: 'auto' }}>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={column.sx}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: Book) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  onClick={() => {
                    dispatch(getBookById(row.id))
                    navigate(`/bookInfo/${row.id}`)
                  }}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    if (column.id === 'bookCoverLink') {
                      if (row.bookCoverLink) {
                        return (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Box
                              component="img"
                              sx={{
                                height: 150,
                                maxHeight: { xs: 100, md: 120 }
                              }}
                              alt="Book cover"
                              src={row.bookCoverLink}
                            />
                          </TableCell>
                        )
                      }
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          sx={{ display: { xs: 'none', md: 'block' } }}>
                          <BookIcon sx={{ fontSize: '80px', color: 'grey' }} />
                        </TableCell>
                      )
                    }
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
