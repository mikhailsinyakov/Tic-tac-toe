import Matrix from './Matrix';

class GameBoard extends Matrix {
    constructor(rows, columns) {
        super(rows, columns);
    }

    findWinner(matchesToWin) {
        const values = this.getValues();
        const lines = [
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[2, 0], [1, 1], [0, 2]]
        ];

        let winner = null;

        outerLoop:
        for (const lineCoords of lines) {
            const symbols = {};

            for (const coord of lineCoords) {
                const [x, y] = coord;
                const value = values[y][x];
                if (value === null) continue;
                if (!symbols[value]) {
                    symbols[value] = 1;
                } else {
                    symbols[value]++;
                }
                if (symbols[value] >= matchesToWin) {
                    winner = value;
                    break outerLoop;
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