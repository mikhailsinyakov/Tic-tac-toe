const values = Symbol('values');

class Matrix {
    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this[values] = (() => {
            if (typeof rows != 'number' || typeof columns != 'number') {
                throw new Error('This constructor must contains two parameters of type number');
            }
    
            const matrix = [];
            for (let row = 0; row < rows; row++) {
                for (let column = 0; column < columns; column++) {
                    if (!matrix[row]) matrix[row] = [];
                    matrix[row][column] = null;
                }
            }
            return matrix;
        })();
        
        Object.freeze(this);
    }

    getValues() {
        return this[values];
    }

    addValue(row, column, value) {
        if (typeof row != 'number' || typeof column != 'number') {
            throw new Error('First two parameters should be numbers');
        }
        if (this[values][row][column] !== null) {
            throw new Error('This element of matrix should exist and be empty');
        }
        this[values][row][column] = value;
    }

    isEmpty() {
        if (this[values].some(arr => arr.some(val => val))) return false;
        return true;
    }

    isFull() {
        return !this[values].some(arr => arr.some(val => val === null));
    }

    findEmptyCells() {
        const emptyCells = [];

        this[values].forEach((row, rowIndex) => row.forEach((column, columnIndex) => {
            if (this[values][rowIndex][columnIndex] === null) emptyCells.push([columnIndex, rowIndex]);
        }));

        return emptyCells;
    }

    static copy(matrix) {
        const newMatrix = new Matrix(matrix.rows, matrix.columns);

        matrix.getValues().forEach((row, rowIndex) => row.forEach((value, columnIndex) => {
            newMatrix.addValue(rowIndex, columnIndex, value);
        }));

        return newMatrix;
    }
}

export default Matrix;