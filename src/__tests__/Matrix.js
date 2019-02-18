import Matrix from '../lib/Matrix';

describe('new instance of Matrix class', () => {
    test('if parameters are not numbers should throw error', () => {
        expect(() => new Matrix()).toThrow();
        expect(() => new Matrix('not a number')).toThrow();
    });
    
    test('should return matrix instance', () => {
        expect(new Matrix(2, 3)).toBeInstanceOf(Matrix);
    });
});

describe('methods of Matrix class', () => {
    let matrix;
    beforeEach(() => {
        matrix = new Matrix(3, 3);
    });
    afterEach(() => {
        matrix = undefined;
    });

    test('when call getValues method should return array', () => {
        expect(matrix.getValues()).toBeInstanceOf(Array);
    });
    
    test('should be able to add value', () => {
        matrix.addValue(0, 0, 5);
        expect(matrix.getValues()[0][0]).toBe(5);
        expect(() => matrix.addValue('not a number', 'string', 5)).toThrow();
        expect(() => matrix.addValue(4, 0, 5)).toThrow();
    });
    
    test('should return the right result when calling isEmpty method', () => {
        expect(matrix.isEmpty()).toBe(true);
        matrix.addValue(0, 0, 'k');
        expect(matrix.isEmpty()).toBe(false);
    });
    
    test('should return the right result when calling isFull method', () => {
        expect(matrix.isFull()).toBe(false);
        matrix.addValue(0, 0, 'text');
        matrix.addValue(0, 1, 'some value');
        matrix.addValue(0, 2, 5);
        matrix.addValue(1, 0, true);
        matrix.addValue(1, 1, 6);
        matrix.addValue(1, 2, 'some value');
        matrix.addValue(2, 0, false);
        matrix.addValue(2, 1, 7);
        matrix.addValue(2, 2, 8);
        expect(matrix.isFull()).toBe(true);
    });
    
    test('should return the right result when calling findEmptyCells method', () => {
        matrix.addValue(0, 1, 'some value');
        matrix.addValue(0, 2, 5);
        matrix.addValue(1, 0, true);
        matrix.addValue(1, 1, 6);
        matrix.addValue(2, 0, false);
        matrix.addValue(2, 1, 8);
        expect(matrix.findEmptyCells()).toEqual([[0, 0], [2, 1], [2, 2]]);
        matrix.addValue(0, 0, true);
        expect(matrix.findEmptyCells()).toEqual([[2, 1], [2, 2]]);
    });
    
    test('should copy the matrix when calling static copy method', () => {
        matrix.addValue(0, 1, 'some value');
        matrix.addValue(0, 2, 5);
        matrix.addValue(1, 0, true);
        matrix.addValue(1, 1, 6);
        matrix.addValue(2, 0, false);
        matrix.addValue(2, 1, 8);
        expect(Matrix.copy(matrix)).toEqual(matrix);
    });
});

test('when trying to change rows or columns property should throw error', () => {
    const matrix = new Matrix(3, 3);
    expect(() => matrix.rows = 5).toThrow();
    expect(() => matrix.columns = 5).toThrow();
});