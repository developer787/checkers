import React, { Component } from 'react'
import {connect} from 'react-redux'
import { movePiece, pieceActive } from '../store/actions'
import './keypad.css'

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
	  activeSquare: state.board.activeSquare
	}
}
const mapDispatchToProps = (dispatch)  => ({
		movePiece: (val) => dispatch(movePiece(val)),
		pieceActive: (val) => dispatch(pieceActive(val))
});

let count = 1;
class Grid extends Component {
    constructor(props){
    	super(props)
    	this.checkValidMove = this.checkValidMove.bind(this)
    	this.checkStatus = this.checkStatus.bind(this)
    }
    checkValidMove(event, i){
    	this.props.movePiece(event)
    }
    checkStatus(event, i){
    	this.props.pieceActive(event)
   

    }
	render(){
		count = 1;
		const { 
			
			firstRow,
			secondRow,
			thirdRow,
			fourthRow,
			fifthRow,
			sixthRow,
			seventhRow,
			eigthRow,
		
		} = this.props
		return(
			<div className={"buttonGrid"}>
			<div className="grid-container">
			{row(firstRow, this.checkValidMove, this)}
			{row(secondRow, this.checkValidMove, this)}
			{row(thirdRow, this.checkValidMove, this)}
			{row(fourthRow, this.checkValidMove, this)}
			{row(fifthRow, this.checkValidMove, this)}
			{row(sixthRow, this.checkValidMove, this)}
			{row(seventhRow, this.checkValidMove, this)}
			{row(eigthRow, this.checkValidMove, this)}
			</div>
			

			</div>
		)
	}
}
const buttonGrid = connect(
	mapStateToProps,
	mapDispatchToProps)(Grid)
export default buttonGrid

const row = (row, movePiece, props)=>row.map((e,i)=>{
	
	if(e == 2){
		return (<div data={count} onClick={(event)=>props.checkStatus(event,i)} id={"square"+count++} key={i} className={props.props.status}>{redChip(movePiece, "", i)}</div>)
	} else if(e == 1){
		
		return (<div data={count} onClick={(event)=>props.checkStatus(event,i)} id={"square"+count++} key={i} className={props.props.status}>{blackChip(movePiece, "", i)}</div>)
	} else if(e == 4){
		return (<div data={count} onClick={(event)=>props.checkStatus(event,i)} id={"square"+count++} key={i} className={props.props.status}>{blackChip(movePiece, "♔", i)}</div>)
	} else if(e == 3) {
		return (<div data={count} onClick={(event)=>props.checkStatus(event,i)} id={"square"+count++} key={i} className={props.props.status}>{redChip(movePiece,"♔", i)}</div>)
	} else {
		return (<div data={count} onClick={(event)=>props.checkStatus(event,i)} id={"square"+count++} key={i} className={props.props.status}>{/*greenChip(movePiece,"", i)*/}</div>)
	}
	})
const redChip = (movePiece, k, i)=>(<div className="red-chip">{k}</div>)
const blackChip = (movePiece, k, i)=>(<div className="black-chip">{k}</div>)
//const greenChip = (movePiece, k, i)=>(<div onClick={(e)=>movePiece(e,i)} className="green-chip">{k}</div>)
