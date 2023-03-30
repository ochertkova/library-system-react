import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'

export const OPEN_VIEW = 'OPEN_VIEW'

export function openBook(id: number) {
  return {
    type: OPEN_VIEW,
    payload: { nextView: 'bookInfo', parameters: { id } }
  }
}

export function openView(viewName: string, parameters = {}) {
  return {
    type: OPEN_VIEW,
    payload: { nextView: viewName, parameters }
  }
}

export function openBookForUpdate(id: number, dispatch: AppDispatch) {
  dispatch(openView('updateBook', { id }))
  return {
    type: OPEN_VIEW,
    payload: { nextView: 'updateBook', parameters: { id } }
  }
}
