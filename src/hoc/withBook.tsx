import { useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBookById } from '../redux/actions/book'
import { Typography } from '@mui/material'

function withBook(WrappedComponent: React.ComponentType) {
  return () => {
    const dispatch: AppDispatch = useDispatch()
    const { isLoading, activeBook } = useSelector((state: RootState) => state.books)
    const { id = '' } = useParams()

    useEffect(() => {
      if (!activeBook) {
        dispatch(getBookById(id))
      }
    }, [activeBook])

    if (isLoading || !activeBook) {
      return <Typography>Loading book...</Typography>
    }
    return <WrappedComponent />
  }
}

export default withBook
