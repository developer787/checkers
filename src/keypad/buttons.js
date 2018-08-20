import React from 'react'

const addButton = (value, sendValue) =>{
	const push = _=> sendValue(value)
	return (
	<button onClick={push}>
	{value}
	</button>
)}

export default addButton
