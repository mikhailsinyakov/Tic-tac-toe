import Matrix from './Matrix';

class GameBoard extends Matrix {
    constructor(rows, columns) {
        super(rows, columns);
    }

    findWinner(matchesToWin) {
        const values = this.getValues();
        // Check, if there is more same symbols in row for all directions
        const checkLines = (coords, symbol) => {
            // For each possible direction: to right, to right bottom, to bottom, to left bottom
            const possibleChanges = [[1, 0], [1, 1], [0, 1], [-1, 1]];
            let found = false;

            for (const change of possibleChanges) {
                const [ changeX, changeY ] = change;
                let symbolsInRow = 0;

                let [ x, y ] = coords;
                let isSameSymbol = true;

                while (x >= 0 && y >= 0 && x < this.columns && y < this.rows && isSameSymbol) {
                    isSameSymbol = values[y][x] == symbol;
                    if (isSameSymbol) symbolsInRow++;
                    x += changeX;
                    y += changeY;
                }

                if (symbolsInRow >= matchesToWin) {
                    found = true;
                    break;
                }
            };

            return found;
        };

        let winner = false;
        outerLoop:
        for (const [y, row] of values.entries()) {
            for (const [x, value] of row.entries()) {
                if (value !== null) {
                    const found = checkLines([x, y], value);
                    if (found) {
                        winner = value;
                        break outerLoop;
                    }
                }
            }
        }

        return winner;
    }

    defineGameState(matchesToWin) {
        if (this.isFull()) return { state: 'finished', result: 'draw' };
        const winner = this.findWinner(matchesToWin);
        if (winner) return { state: 'finished', result: 'win', winner };
        return { state: 'in process' };
    }

    findBestMove(matchesToWin, compSymbol, userSymbol) {
        const minimax = (board, isComp, depth) => {
            const gameState = board.defineGameState(matchesToWin);
    
            if (gameState.state == 'finished') {
                if (gameState.result == 'draw') return 0;
                if (gameState.winner == compSymbol) return 10 - depth;
                if (gameState.winner == userSymbol) return depth - 10;
            } else {
                const values = [];
                const possibleMoves = board.findEmptyCells();
                for (const [column, row] of possibleMoves) {
                    const boardCopy = GameBoard.copy(board);
                    const symbol = isComp ? compSymbol : userSymbol;
                    boardCopy.addValue(row, column, symbol);
    
                    const cost = minimax(boardCopy, !isComp, depth + 1);
                    values.push({cost, cell: [column, row]});
                }
    
                const initialCost = isComp ? -Infinity : Infinity;
    
                // If it is comp turn choose max value, otherwise choose min value
                const bestValue = values.reduce((best, value) => {
                    if (isComp && value.cost > best.cost) return value;
                    if (!isComp && value.cost < best.cost) return value;
                    return best;
                }, { cost: initialCost });
    
                if (depth == 0) return bestValue.cell;
                else return bestValue.cost;
            }
        };
    
        const isComp = true;
        const depth = 0;
    
        return minimax(this, isComp, depth);
    }

    static copy(gameBoard) {
        const newGameBoard = new GameBoard(gameBoard.rows, gameBoard.columns);

        gameBoard.getValues().forEach((row, rowIndex) => row.forEach((value, columnIndex) => {
            newGameBoard.addValue(rowIndex, columnIndex, value);
        }));

        return newGameBoard;
    }
}

export default GameBoard;