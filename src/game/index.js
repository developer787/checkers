import React, { Component } from 'react'
import { connect } from 'react-redux'
import Keypad from '../keypad'
import Winner from '../winnerBoard'








import './gameboard.css'
const mapStateToProps = (state) => {
	return {
		gameWrapper: "game"
	}
}


class Game extends Component {
	render() {
		return (
			<div className="gameboard">
			 
		
		      <Keypad />
		     	<Winner />
			</div>
		)
	}
}
const game = connect(
 	mapStateToProps)(Game)
export default game


