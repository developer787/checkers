
const initialState = {
	firstRow:  [0,1,0,1,0,1,0,1],
	secondRow: [1,0,1,0,1,0,1,0],
	thirdRow:  [0,1,0,1,0,1,0,1],
	fourthRow: [0,0,0,0,0,0,0,0],
	fifthRow:  [0,0,0,0,0,0,0,0],
	sixthRow:  [2,0,2,0,2,0,2,0],
	seventhRow:[0,2,0,2,0,2,0,2],
	eigthRow:  [2,0,2,0,2,0,2,0],
	status: "grid-item",
	turn: "playerOne",
	selected: false,
	activeSquare: 0,
	winner: "",
	redScore: 0,
	blackScore: 0
}
export default (state=initialState, action)=> {
	const update = (
		state, 
		mutations) => Object.assign({}, state, mutations)
	switch(action.type) {
	
		case 'PLAY_AGAIN':
			return update(state, {
			    hidden: "buttonGrid hide"
			})
		case 'RESET_GAME':
			return initialState
		case 'PLAYER_ONE_MOVE':
			return update(state, {
			[action.payload.row]:  action.payload.column,
			activeSquare: action.payload.activeSquare,
			turn: action.payload.turn
			})
		case 'PLAYER_ONE_DELETE':
			return update(state, {
			[action.payload.row]:  action.payload.column
			})
		case 'PLAYER_TWO_MOVE':
			return update(state, {
			[action.payload.row]:  action.payload.column,
			
			turn: "playerOne"
			})
		case 'PIECE_ACTIVE':
			return update(state, {
		      status: "grid-item-status-active"
			})
		case 'RED_SCORE':
			return update(state, {
		      redScore: action.payload.redScore
			})
		case 'BLACK_SCORE':
			return update(state, {
		      blackScore: action.payload.blackScore
			})
		case 'PIECE_SELECTED':
			return update(state, {
		      selected: true,
		      activeSquare: action.payload
			})
		case 'PIECE_DESELECTED':
			return update(state, {
		      selected: false
		})
		case 'ACTIVE_CHIP':
			return update(state, {
		      activeSquare: action.payload
		})
		case 'DECLARE_WINNER':
			return update(state, {
		      winner: action.payload
		})
		case 'VALID_MOVE':
			return update(state, {
		      status: "grid-item-status-valid"
			})
		default:
			return state;
	}
}