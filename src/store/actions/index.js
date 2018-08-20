export const scoreIncrement = () => ({ type: 'SCORE_INCREMENT' })
export const scoreUpdate = () => ({ type: 'SCORE_UPDATE' })

export const sumAll = () => ({ type: 'SUM_ALL' })
export const START_GAME = () => ({ type: 'START_GAME' })
export const hardreset = () => ({ type: 'HARD_RESET' })
export const savescore = () => ({ type: 'SAVE_SCORE' })
export const showScores = () => ({ type: 'SHOW_SCORES' })
export const hideScores = () => ({ type: 'HIDE_SCORES' })
export const resetGame = () => ({ type: 'RESET_GAME' })




export const START_PRE_TIMER = () => ({ type: 'START_PRE_TIMER' })
export const replay = (payload) => {
    if (payload === "REPLAY?") {
        return {
            type: 'RESET_GAME'
        }
    }
    else {
        return {
            type: 'DO_NOTHING'
        }
    }
}


export const sendValue = (payload) => {
    if (payload === "?") {
        return {
            type: 'DO_NOTHING'
        }
    }
    else {
        return {
            type: 'SEND_VALUE',
            payload
        }
    }

}
export const movePiece = (payload) => {
    if (payload === "?") {
        return {
            type: 'DO_NOTHING'
        }
    }
    else {
        return {
            type: 'MOVE_PIECE',
            payload
        }
    }

}
export const pieceActive = (payload) => {
        return {
            type: 'ACTIVE_PIECE',
            payload
        }

}