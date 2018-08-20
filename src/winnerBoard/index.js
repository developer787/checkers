import React, { Component } from 'react'
import {connect} from 'react-redux'
import { movePiece, pieceActive, resetGame } from '../store/actions'
import './winnerBoard.css'

const mapStateToProps = (state)=> {
	return {
	  firstRow: state.board.firstRow,
	  secondRow: state.board.secondRow,
	  thirdRow: state.board.thirdRow,
	  fourthRow: state.board.fourthRow,
	  fifthRow: state.board.fifthRow,
	  sixthRow: state.board.sixthRow,
	  seventhRow: state.board.seventhRow,
	  eigthRow: state.board.eigthRow,
	  status: state.board.status,
	  selected: state.board.selected,
	  activeSquare: state.board.activeSquare,
	  winner: state.board.winner,
	  redScore: state.board.redScore,
	  blackScore: state.board.blackScore
	}
}
const mapDispatchToProps = (dispatch)  => ({
		movePiece: (val) => dispatch(movePiece(val)),
		pieceActive: (val) => dispatch(pieceActive(val)),
		resetGame: (val) => dispatch(resetGame(val))
});

let count = 1;
class Grid extends Component {
    constructor(props){
    	super(props)
    	this.checkValidMove = this.checkValidMove.bind(this)
    	this.checkStatus = this.checkStatus.bind(this)
    	this.resetGame = this.resetGame.bind(this)
    }
    checkValidMove(event, i){
    	this.props.movePiece(event)
    }
    checkStatus(event, i){
    	this.props.pieceActive(event)
   

    }
    getWinner(){
    	if(this.props.winner == ""){
    		return null
    	} else {
    		return(
    			<div>
    			<h1>Winner</h1>
				<h2>{this.props.winner}</h2>
				</div>
    		)
    	}
    	
    }
    resetGame(){
    	console.log("GAME RESET")
    	this.props.resetGame()
    	
    }
	render(){
		count = 1;
		const { 
			
			winner,
			redScore,
			blackScore
		
		} = this.props
	
		return(
			<div className={"buttonGrid"}>
			<div className="grid-containerb">
			    <span>RED: {redScore}</span><br/>
			    <span>BLACK: {blackScore}</span><br/>
			    <button onClick={this.resetGame}>Reset Game</button>
				{this.getWinner()}
			</div>
		
			

			</div>
		)
	}
}
const buttonGrid = connect(
	mapStateToProps,
	mapDispatchToProps)(Grid)
export default buttonGrid
