import { OPEN_VIEW } from '../actions/view'

const initialState = {
  activeView: 'none',
  parameters: {}
}
export default function viewReducer(state: ViewState = initialState, action: BookAction) {
  switch (action.type) {
    case OPEN_VIEW: {
      return {
        activeView: action.payload.nextView,
        parameters: action.payload.parameters
      }
    }
    default:
      return state
  }
}
