export const BORROW = 'BORROW'
export const RETURN = 'RETURN'
export const ADD = 'ADD'
export const UPDATE = 'UPDATE'
export const REMOVE = 'REMOVE'

export function handleBorrow(userId: number, bookId: number) {
  return {
    type: BORROW,
    payload: { userId, bookId }
  }
}

export function handleReturn(userId: number, bookId: number) {
  return {
    type: RETURN,
    payload: { userId, bookId }
  }
}

export function handleAdd(id: number) {
  return {
    type: ADD,
    payload: { id }
  }
}
export function handleUpdate(id: number) {
  return {
    type: UPDATE,
    payload: { id }
  }
}
export function handleRemove(id: number) {
  return {
    type: REMOVE,
    payload: { id }
  }
}
