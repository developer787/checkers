import React, { Component } from 'react'
import {connect} from 'react-redux'
import buttons from './buttons'
import { sendValue } from '../store/actions'
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

// const getRandomIntInclusive = (min, max) => {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
// }
// const buttonArray1 = [0,0,0]
// const btnArray1 = buttonArray1.map(
// 	()=>getRandomIntInclusive(1, 9))
// const buttonArray2 = [0,0,0].map(
// 	()=>getRandomIntInclusive(1, 9))
// const buttonArray3 = [0,0,0].map(
// 	()=>getRandomIntInclusive(1, 9))
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
    	/*const square = ReactDOM.findDOMNode(event.target).parentNode
    	const chip = event.target
    	console.log(event.target,"-->>", chip, "<<--", square.getAttribute("data"))
    	if(this.props.selected && square.getAttribute("data") === this.props.activeSquare) {
    		console.log("SAME")
    		square.classList.remove('active');
    		chip.classList.remove('active');
    	} else {
    	if (square.classList.contains('active')) {
			square.classList.remove('active');
		} else {
			square.classList.add('active');
		}
		if (!chip.classList.contains('active') && ) {
			chip.classList.add('active')
			this.props.pieceActive(square.getAttribute("data"))
		} else {
			chip.classList.remove('active');
		}
    	}*/

    }
	render(){
		count = 1;
		const { 
			keypad,
			firstRow,
			secondRow,
			thirdRow,
			fourthRow,
			fifthRow,
			sixthRow,
			seventhRow,
			eigthRow,
			btnArray2,
			btnArray3
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
		return (<div data={count} onClickCapture={(event)=>props.checkStatus(event,i)} id={"square"+count++} key={i} className={props.props.status}>{redChip(movePiece, "", i)}</div>)
	} else if(e == 1){
		
		return (<div data={count} onClickCapture={(event)=>props.checkStatus(event,i)} id={"square"+count++} key={i} className={props.props.status}>{blackChip(movePiece, "", i)}</div>)
	} else if(e == 4){
		return (<div data={count} onClickCapture={(event)=>props.checkStatus(event,i)} id={"square"+count++} key={i} className={props.props.status}>{blackChip(movePiece, "♔", i)}</div>)
	} else if(e == 3) {
		return (<div data={count} onClickCapture={(event)=>props.checkStatus(event,i)} id={"square"+count++} key={i} className={props.props.status}>{redChip(movePiece,"♔", i)}</div>)
	} else {
		return (<div data={count} onClickCapture={(event)=>props.checkStatus(event,i)} id={"square"+count++} key={i} className={props.props.status}>{/*greenChip(movePiece,"", i)*/}</div>)
	}
	})
const redChip = (movePiece, k, i)=>(<div onClick={(e)=>movePiece(e,i)} className="red-chip">{k}</div>)
const blackChip = (movePiece, k, i)=>(<div onClick={(e)=>movePiece(e,i)} className="black-chip">{k}</div>)
//const greenChip = (movePiece, k, i)=>(<div onClick={(e)=>movePiece(e,i)} className="green-chip">{k}</div>)
