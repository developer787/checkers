import { combineReducers } from "redux"




import board from './board'






const appReducer = combineReducers({
   
   
    board,
    

})
const rootReducer = (state, action) => {
  if (action.type === 'HARD_RESET') {
    state = undefined
  }
  return appReducer(state, action)
}
export default rootReducer
