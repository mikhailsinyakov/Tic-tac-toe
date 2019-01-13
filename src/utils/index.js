const utils = {};

utils.createEmpty2dArray = size => {
    size = typeof size == 'object' && size instanceof Array && size.length == 2 ? size : null;
    if (!size) {
        throw new Error('Parameter should be array of length 2');
    }

    const [ columns, rows ] = size;
    const arr = [];

    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (!arr[row]) arr[row] = [];
            arr[row][column] = null;
        }
    }

    return arr;
};

utils.clear2dArray = arr2d => {
    const is2dArray = utils.checkIsIt2dArray(arr2d);
    if (!is2dArray) {
        throw new Error('Parameter should be 2d array');
    }

    const rows = arr2d.length;
    const columns = arr2d[0].length;

    const newArr = [];
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            if (!newArr[row]) newArr[row] = [];
            newArr[row][column] = null;
        }
    }
    return newArr;
};

utils.to1dArray = arr2d => {
    const is2dArray = utils.checkIsIt2dArray(arr2d);
    if (!is2dArray) {
        throw new Error('Parameter should be 2d array');
    }

    return [].concat(...arr2d);
};

utils.checkIsIt2dArray = arr2d => {
    arr2d = typeof arr2d == 'object' && arr2d instanceof Array ? arr2d : null;
    if (!arr2d) {
        return false;
    }

    const is2dArray = !arr2d.some(elem => typeof elem != 'object' || !(elem instanceof Array));
    if (!is2dArray) {
        return false;
    }

    return true;

};

utils.minimax = (gameState, depth, isMaximizingPlayer, alpha, beta, initDepth) => {
    if (!initDepth) initDepth = depth;
    if (depth == 0 || gameState.isGameOver()) {
        return gameState.staticEval;
    } else if (isMaximizingPlayer) {
        let maxEval = -Infinity;
        let bestMove = null;
        for (const [column, row] of gameState.allPossibleMoves) {
            gameState.addMove(row, column, true);
            const gotEval = utils.minimax(gameState, depth - 1, false, alpha, beta, initDepth);
            gameState.removeMove(row, column);
            if (gotEval > alpha) alpha = gotEval;
            if (gotEval > maxEval) {
                maxEval = gotEval;
                bestMove = [column, row];
            }
            if (beta <= alpha) {
                break;
            }
        }
        if (depth == initDepth) return bestMove;
        else return maxEval;
    } else {
        let minEval = Infinity;
        for (const [column, row] of gameState.allPossibleMoves) {
            gameState.addMove(row, column, false);
            const gotEval = utils.minimax(gameState, depth - 1, true, alpha, beta, initDepth);
            gameState.removeMove(row, column);
            if (gotEval < beta) beta = gotEval;
            if (gotEval < minEval) minEval = gotEval;
            if (beta <= alpha) {
                break;
            }
        }
        return minEval;
    }
};

module.exports = utils;