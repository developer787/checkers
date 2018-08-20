import { put, select, takeEvery, all } from 'redux-saga/effects'
import ReactDOM from 'react-dom';


// Checkers

export function* activePiece(action) {
  const getBoard = state => state.board
  const board = yield select(getBoard);
  const track = [
    ...board.firstRow, ...board.secondRow, ...board.thirdRow, ...board.fourthRow,
    ...board.fifthRow, ...board.sixthRow, ...board.seventhRow, ...board.eigthRow,
    ]
  const square = ReactDOM.findDOMNode(action.payload.target).parentNode
  const squareId = square.getAttribute("data")
 
  
    if(board.turn == "playerOne") {
      
    const payload = {}
     console.log("Player One", track);
     if (!square.classList.contains('active') && board.activeSquare == 0 && track[squareId - 1] == (2 || 4)) {
       //console.log("TRACK:", track[squareId - 1]);
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
    //console.log("Player Two");
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
    //console.log("Active Square: ", board.activeSquare)
    const payload = {}
    payload.activeSquare = board.activeSquare
    payload.squareId = ReactDOM.findDOMNode(action.payload.target).getAttribute("data")
    payload.square = ReactDOM.findDOMNode(action.payload.target)
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
    const square = action.payload.square
    const pieceValue = track[piecePosition - 1]
    const inRange = ()=>{
      if(board.turn === "playerOne"){
        return (piecePosition - newPosition == 7) || (piecePosition - newPosition == 9) ? true: false;
      } else {
        return (piecePosition - newPosition == -7) || (piecePosition - newPosition == -9)
      }
    }
    const inAttackRange = ()=>{
      if(board.turn === "playerOne"){
        return (piecePosition - newPosition == 14) || (piecePosition - newPosition == 18) ? true: false;
      } else {
        return (piecePosition - newPosition == -14) || (piecePosition - newPosition == -18)
      }
    }
    const isEmpty = track[newPosition - 1] == 0 ? true: false;
    
    //const Attack = track[(newPosition - 1)] == 0 ? true: false;
    //console.log("Cheking Valid Move: ", inRange(), isEmpty)
    const valid = inRange() && isEmpty
    const attack = inAttackRange() && isEmpty
    if(valid) {
      //console.log("VALID MOVE: ", "In range: ", inRange(),"Is empty: ", isEmpty);
      const column = board[findRow(newPosition)]
      column[findPosition(newPosition)] = pieceValue
      const oldcolumn = board[findRow(piecePosition)]
      oldcolumn[findPosition(piecePosition)] = 0
      const payload = {}
      payload.row = findRow(newPosition)
      payload.column = column
      payload.activeSquare = 0
      if(board.turn === "playerOne"){
        payload.turn = "playerTwo"
      } else {
        payload.turn = "playerOne"
      }
      
      yield put({ type: 'PLAYER_ONE_MOVE', payload: payload});
      yield put({ type: 'PLAYER_ONE_DELETE', payload: {
        row: findRow(piecePosition),
        column: oldcolumn
      }});
      removeHighlight(square)
    } else if(attack){
      console.log("ATTACK MOVE: ", "In range: ", inRange(),"Is empty: ", isEmpty);
      console.log("ATTACK Direction: ", piecePosition - newPosition);
      let enemyColumn;
      let enemyPosition;
      let enemyId
      switch (piecePosition - newPosition) {
        case 14:
          enemyColumn = board[findRow(+newPosition + 7)]
          enemyPosition = findPosition(+newPosition + 7)
          enemyId = +newPosition + 7
          break;
        case 18:
          enemyColumn = board[findRow(+newPosition + 9)]
          enemyPosition = findPosition(+newPosition + 9)
          enemyId = +newPosition + 9
          break;
        case -14:
          enemyColumn = board[findRow(+newPosition - 7)]
          enemyPosition = findPosition(+newPosition - 7)
          enemyId = +newPosition - 7
          break;
        
        default:
          enemyColumn = board[findRow(+newPosition - 9)]
          enemyPosition = findPosition(+newPosition - 9)
          enemyId = +newPosition - 9
      }
      const column = board[findRow(newPosition)]
      column[findPosition(newPosition)] = pieceValue
      const oldcolumn = board[findRow(piecePosition)]
      console.log("ATTACK INFO: ", enemyColumn, enemyPosition);
      oldcolumn[findPosition(piecePosition)] = 0
      enemyColumn[enemyPosition] = 0
      const payload = {}
      payload.row = findRow(newPosition)
      payload.column = column
      payload.activeSquare = 0
      if(board.turn === "playerOne"){
        payload.turn = "playerTwo"
      } else {
        payload.turn = "playerOne"
      }
      
      yield put({ type: 'PLAYER_ONE_MOVE', payload: payload});
      yield put({ type: 'PLAYER_ONE_DELETE', payload: {
        row: findRow(piecePosition),
        column: oldcolumn
      }});
      yield put({ type: 'PLAYER_ONE_DELETE', payload: {
        row: findRow(enemyId),
        column: enemyColumn
      }});
      const newTrack = compressArray(track)
      console.log("newTrack:", newTrack)
      const redScore = 12 - newTrack[2].count
      const blackScore = 12 - newTrack[1].count
      removeHighlight(square)
      console.log(redScore, blackScore)
       yield put({ type: 'BLACK_SCORE', payload: blackScore});
       yield put({ type: 'RED_SCORE', payload: redScore});
      if(newTrack[1].count == 1){
        yield put({ type: 'DECLARE_WINNER', payload: "BLACK"});
        
      } else if(newTrack[2].count == 1){
        yield put({ type: 'DECLARE_WINNER', payload: "RED"});
       
      }
      
    }  else {
      console.log("INVALID MOVE: ", action.payload)
    }
  

   
  
  
}

const removeHighlight = (target)=>{
  const square = target
  
  square.classList.remove('active');
  
}




export function* watchCheckValidMove() {
  const action = yield takeEvery('CHECK_VALID_MOVE', checkValidMove)
}
export function* resetGame(){
  yield put({ type: 'HARD_RESET'});
  
}

export function* watchResetGame() {
  const action = yield takeEvery('RESET_GAME', resetGame)
}


export default function* rootSaga() {
  yield all([

    
    watchActivePiece(),
    watchCheckValidMove(),
    //watchResetGame()
    
  ])
}

function compressArray(original) {
 
	var compressed = [];
	// make a copy of the input array
	var copy = original.slice(0);
 
	// first loop goes over every element
	for (var i = 0; i < original.length; i++) {
 
		var myCount = 0;	
		// loop over every element in the copy and see if it's the same
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
 
		if (myCount > 0) {
			var a = new Object();
			a.value = original[i];
			a.count = myCount;
			compressed.push(a);
		}
	}
 
	return compressed;
};
