import { DECREMENT, INCREMENT } from '../actions/counter'

const initialState = 0
export default function counterReducer(state = initialState, action: any) {
  switch (action.type) {
    case INCREMENT: {
      console.log(`state + 1 is ${state + 1}`)
      return state + 1
    }
    case DECREMENT: {
      console.log(`state - 1 is ${state - 1}`)
      return state - 1
    }
    default:
      return state
  }
}
