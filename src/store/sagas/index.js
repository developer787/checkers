import { put, select, takeEvery, all } from 'redux-saga/effects'
import ReactDOM from 'react-dom';







export function* scoreUpdate() {
  yield put({ type: 'SCORE_INCREMENT' });
}

export function* watchScoreUpdate() {
  yield takeEvery('SCORE_UPDATE', scoreUpdate)
}

export function* resultUpdate() {
  const getNumbers = state => state.keypad.numbers
    const getResult = state => state.result.result
  const result = yield select(getResult);

  const numbers = yield select(getNumbers);
  const payload = numbers
  if(result === "X"){
    yield put({ type: 'DO_NOTHING'});
  } else {
    yield put({ type: 'SUM_ALL', payload });
  }
  
}

export function* watchResultUpdate() {
  yield takeEvery('SEND_VALUE', resultUpdate)
}
export function* targetUpdate() {
  const getTarget = state => state.target.target
  const target = yield select(getTarget);
  const payload = target
  yield put({ type: 'TARGET_UPDATE', payload });
}

export function* watchTargetUpdate() {
  yield takeEvery('SEND_VALUE', targetUpdate)
}
// export function* incrementAsync() {
//   yield call(delay, 1000);
//   yield put({ type: 'INCREMENT' });
// }

// export function* watchIncrementAsync() {
//   yield takeEvery('INCREMENT_ASYNC', incrementAsync)
// }
export function* test(){
	yield "testing 1.. 2.. 3.."
}

// Checkers
export function* movePiece(action) {
  const getBoard = state => state.board
  const board = yield select(getBoard);
  
  
  if(board.turn == "playerOne") {
    const payload = {}
     //console.log("Player One Moved.  -->", action.payload, "====>", board);
   
    //yield put({ type: 'PLAYER_ONE_MOVE', payload });
  } else {
    const payload = {}
    //console.log("Player TWO Moved.  -->", action.payload, "====>", board);
    //yield put({ type: 'PLAYER_TWO_MOVE', payload });
  }
  
}

export function* watchMovePiece() {
  const action = yield takeEvery('MOVE_PIECE', movePiece)
}

export function* activePiece(action) {
  const getBoard = state => state.board
  const board = yield select(getBoard);
  const track = [
    ...board.firstRow, ...board.secondRow, ...board.thirdRow, ...board.fourthRow,
    ...board.fifthRow, ...board.sixthRow, ...board.seventhRow, ...board.eigthRow,
    ]
  const square = ReactDOM.findDOMNode(action.payload.target).parentNode
  const squareId = square.getAttribute("data")
  const chip = action.payload.target
  
    if(board.turn == "playerOne") {
      
    const payload = {}
     console.log("Player One", track);
     if (!square.classList.contains('active') && board.activeSquare == 0 && track[squareId - 1] == (2 || 4)) {
       console.log("TRACK:", track[squareId - 1]);
      yield put({ type: 'ACTIVE_CHIP', payload: squareId });
			square.classList.add('active')
		} else {
		  if(board.activeSquare == squareId){
		    square.classList.remove('active');
		    yield put({ type: 'ACTIVE_CHIP', payload : 0});
		  }
		}
    //yield put({ type: 'PLAYER_ONE_MOVE', payload });
  } else {
    const payload = {}
    console.log("Player Two");
    if (!square.classList.contains('active') && board.activeSquare == 0 && track[squareId - 1] == (1 || 3)) {
       console.log("TRACK:", track[squareId - 1]);
      yield put({ type: 'ACTIVE_CHIP', payload: squareId });
			square.classList.add('active')
		} else {
		  if(board.activeSquare == squareId){
		    square.classList.remove('active');
		    yield put({ type: 'ACTIVE_CHIP', payload : 0});
		  }
		}
    //yield put({ type: 'PLAYER_TWO_MOVE', payload });
  }
  if(board.activeSquare == 0){
    console.log("Active Square: ", board.activeSquare)
    
  } else {
    console.log("Active Square: ", board.activeSquare)
    const payload = {}
    payload.activeSquare = board.activeSquare
    payload.squareId = ReactDOM.findDOMNode(action.payload.target).getAttribute("data")
    yield put({ type: 'CHECK_VALID_MOVE', payload});
    
  }
   
  
  
}



export function* watchActivePiece() {
  const action = yield takeEvery('ACTIVE_PIECE', activePiece)
}

const findRow = id=>{
  if(id > 0 && id < 9){
    return "firstRow"
  } else if(id > 8 && id < 17){
    return "secondRow"
  } else if(id > 16 && id < 25){
    return "thirdRow"
  } else if(id > 24 && id < 33){
    return "fourthRow"
  } else if(id > 32 && id < 41){
    return "fifthRow"
  } else if(id > 40 && id < 49){
    return "sixthRow"
  } else if(id > 48 && id < 57){
    return "seventhRow"
  } else {
    return "eigthRow"
  }
}
const findPosition = id=>{
  if(id > 0 && id < 9){
    return id - 1
  } else if(id > 8 && id < 17){
    return id - 9
  } else if(id > 16 && id < 25){
    return id - 17
  } else if(id > 24 && id < 33){
    return id - 25
  } else if(id > 32 && id < 41){
    return id - 33
  } else if(id > 40 && id < 49){
    return id - 41
  } else if(id > 48 && id < 57){
    return id - 49
  } else {
    return id - 57
  }
}

export function* checkValidMove(action) {
  const getBoard = state => state.board
  const board = yield select(getBoard);
  const track = [
    ...board.firstRow, ...board.secondRow, ...board.thirdRow, ...board.fourthRow,
    ...board.fifthRow, ...board.sixthRow, ...board.seventhRow, ...board.eigthRow,
    ]
    const piecePosition = action.payload.activeSquare
    const newPosition = action.payload.squareId
    const pieceValue = track[piecePosition - 1]
    const inRange = ()=>{
      if(board.turn === "playerOne"){
        return piecePosition - newPosition == (7 || 9) ? true: false;
      } else {
        return piecePosition + newPosition == (7 || 9) ? true: false;
      }
    }
    const isEmpty = track[newPosition - 1] == 0 ? true: false;
    console.log("Cheking Valid Move: ", inRange(), isEmpty)
    const valid = inRange() && isEmpty
    if(valid) {
      console.log("VALID MOVE: ", inRange(), isEmpty);
      const column = board[findRow(newPosition)]
      column[findPosition(newPosition)] = 2
      const oldcolumn = board[findRow(piecePosition)]
      oldcolumn[findPosition(piecePosition)] = 0
      const payload = {}
      payload.row = findRow(newPosition)
      payload.column = column
      
      
      yield put({ type: 'PLAYER_ONE_MOVE', payload: payload});
      yield put({ type: 'PLAYER_ONE_DELETE', payload: {
        row: findRow(piecePosition),
        column: oldcolumn
      }});
    } else {
      console.log("INVALID MOVE: ", action.payload)
    }
  

   
  
  
}



export function* watchCheckValidMove() {
  const action = yield takeEvery('CHECK_VALID_MOVE', checkValidMove)
}

export default function* rootSaga() {
  yield all([

    watchMovePiece(),
    watchActivePiece(),
    watchCheckValidMove(),
    test()
  ])
}
