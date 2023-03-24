import React from 'react'
import {
  Box,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar
} from '@mui/material'

import bookData from '../../../public/data/books.json'

const books = bookData

interface Column {
  id: 'cover' | 'ISBN' | 'title' | 'authors' | 'status'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'cover', label: 'Cover', minWidth: 170 },
  { id: 'ISBN', label: 'ISBN', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 100 },
  { id: 'authors', label: 'Authors', minWidth: 100 },
  { id: 'status', label: 'Status', minWidth: 100 }
]

const rows = bookData

export default function ContentTable() {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.ISBN}>
                  {columns.map((column) => {
                    const value = row[column.id]
                    if (column.id === 'cover') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Box
                            component="img"
                            sx={{
                              height: 150,
                              maxHeight: { xs: 100, md: 120 }
                            }}
                            alt="Book cover"
                            src={row.cover}
                          />
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
