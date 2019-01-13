import utils from '@utils';

class Line {
    constructor(startCell, type) {
        this.startCell = startCell;
        this.type = type;
        this.cells = [];
        this.values = [];
        this.symbolsInRow = {};
    }

    initLine(columns, rows) {
        const [ shiftX, shiftY ] = this.defineShift();
        let [ x, y ] = this.startCell;

        while(x >= 0 && x < columns && y >= 0 && y < rows) {
            this.cells.push([x, y]);
            this.values.push(null);
            x += shiftX;
            y += shiftY;
        }
    }

    defineShift() {
        if (this.type == 'horizontal') return [1, 0];
        else if (this.type == 'vertical') return [0, 1];
        else if (this.type == 'diagonalDown') return [1, 1];
        else if (this.type == 'diagonalUp') return [1, -1];
    }

    updateLine(arr2d) {
        this.updateValues(arr2d);
        this.updateSymbolsInRow();
    }

    updateValues(arr2d) {
        this.values = this.cells.map(([x, y]) => arr2d[y][x]);
    }

    updateSymbolsInRow() {
        const symbolsInRow = {};
        const symbols = ['×', '○'];

        for (const symbol of symbols) {
            const values = [...this.values];
            const actual = this.calcSymbolsInRow(symbol, values);
            const possible = [];
            const emptyValuesCount = values.filter(val => !val).length;
            if (!emptyValuesCount) possible.push(actual);
            else {
                for (const [index, val] of values.entries()) {
                    const changedValues = [...values];
                    if (!val) {
                        changedValues[index] = symbol;
                        const possibleResult = this.calcSymbolsInRow(symbol, changedValues);
                        possible.push(possibleResult);
                    }
                }
            }
            symbolsInRow[symbol] = { actual, possible };
        }

        this.symbolsInRow = symbolsInRow;
    }

    calcSymbolsInRow(symbol, values) {
        
        const array = [];
        let count = 0;

        for (const value of values) {
            if (value == symbol) count++;
            else {
                array.push(count);
                count = 0;
            }
        }

        if (count) array.push(count);
        
        return array;
    }

    isLineFull() {
        return !this.values.some(val => !val);
    }
}

export default class GameState {
    constructor() {
        this.arr2d = [];
        this.lines = [];
        this.allPossibleMoves = [];
        this.matchesToWin = null;
        this.staticEval = null;
        this.compSymbol = null;
        this.userSymbol = null;
    }

    init([columns, rows], matchesToWin) {
        this.matchesToWin = matchesToWin;

        const lines = [];
            
        // Add lines, that starts from top side
        for (let x = 0; x < columns; x++) {
            const y = 0;
            const line1 = new Line([x, y], 'vertical');
            const line2 = new Line([x, y], 'diagonalDown');
            line1.initLine(columns, rows);
            line2.initLine(columns, rows);
            lines.push(line1, line2);
        }

        // Add lines, that starts from left side
        for (let y = 0; y < rows; y++) {
            const x = 0;
            const line1 = new Line([x, y], 'horizontal');
            const line2 = new Line([x, y], 'diagonalDown');
            const line3 = new Line([x, y], 'diagonalUp');
            line1.initLine(columns, rows);
            line2.initLine(columns, rows);
            line3.initLine(columns, rows);
            lines.push(line1, line2, line3);
        }

        // Add lines, that starts from bottom side
        for (let x = 0; x < columns; x++) {
            const y = rows - 1;
            const line1 = new Line([x, y], 'diagonalUp');
            line1.initLine(columns, rows);
            lines.push(line1);
        }

        this.lines = lines;
    }

    update(arr2d) {
        this.arr2d = arr2d;
        this.allPossibleMoves = this.findAllPossibleMoves();

        for (const line of this.lines) {
            line.updateLine(arr2d);
        }

        this.staticEval = this.calcStaticEval();
    }

    addMove(row, column, isComp) {
        const arr2d = [...this.arr2d];
        arr2d[row][column] = isComp ? this.compSymbol : this.userSymbol;
        this.arr2d = arr2d;
        this.update(arr2d);
    }

    removeMove(row, column) {
        const arr2d = [...this.arr2d];
        arr2d[row][column] = null;
        this.arr2d = arr2d;
        this.update(arr2d);
    }

    updateSymbols(compSymbol, userSymbol) {
        this.compSymbol = compSymbol;
        this.userSymbol = userSymbol;
    }

    findAllPossibleMoves() {
        const allPossibleMoves = [];

        for (const [rowIndex, row] of this.arr2d.entries()) {
            for (const [columnIndex, column] of row.entries()) {
                if (!this.arr2d[rowIndex][columnIndex]) allPossibleMoves.push([columnIndex, rowIndex]);
            }
        }

        return allPossibleMoves;
    }

    calcStaticEval(log) {
        let staticEval = 0;
        const evalForWin = 100;

        for (const line of this.lines) {
            const compSymbolsInRow = line.symbolsInRow[this.compSymbol];
            const userSymbolsInRow = line.symbolsInRow[this.userSymbol];
            
            const compWin = compSymbolsInRow.actual.some(num => num == this.matchesToWin);
            const userWin = userSymbolsInRow.actual.some(num => num == this.matchesToWin);
            const compWinIn1step = compSymbolsInRow.possible.some(arr => arr.some(num => num == this.matchesToWin));
            const userWinIn1step = userSymbolsInRow.possible.some(arr => arr.some(num => num == this.matchesToWin));

            if (compWin) staticEval += evalForWin;
            if (userWin) staticEval -= evalForWin;
            if (compWinIn1step) staticEval += evalForWin / 10;
            if (userWinIn1step) staticEval -= evalForWin / 10;
        }
        
        return staticEval;
    }

    isGameOver() {
        let winningSymbol;
        
        loop: 
        for (const line of this.lines) {
            for (const symbol in line.symbolsInRow) {
                const actualSymbolsInRow = line.symbolsInRow[symbol].actual;
                if (actualSymbolsInRow.some(num => num == this.matchesToWin)) {
                    winningSymbol = symbol;
                    break loop;
                }
            }
        }

        if (winningSymbol) {
            if (winningSymbol == this.userSymbol) return { result: 'win' };
            else return { result: 'lose' };
        }
        if (this.areLinesFull()) return { result: 'draw' };

        return false;
    }

    areLinesFull() {
        return !this.lines.some(line => !line.isLineFull());
    }

}