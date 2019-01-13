const utils = require('../src/utils');

describe('createEmpty2dArray', () => {
    test('if parameter is not array of length 2 should throw error', () => {
        expect(() => utils.createEmpty2dArray([5])).toThrow();
        expect(() => utils.createEmpty2dArray('string')).toThrow();
    });
    
    test('if array is [2, 2] should return [[null, null], [null, null]]', () => {
        const size = [2, 2];
        const expectedArray = [[null, null], [null, null]];
        expect(utils.createEmpty2dArray(size)).toEqual(expectedArray);
    });
    
    test('if array is [3, 2] should return [[null, null], [null, null]]', () => {
        const size = [3, 2];
        const expectedArray = [[null, null, null], [null, null, null]];
        expect(utils.createEmpty2dArray(size)).toEqual(expectedArray);
    });
});

describe('clear2dArray', () => {
    test('if parameter is not array should throw error', () => {
        expect(() => utils.clear2dArray()).toThrow();
        expect(() => utils.clear2dArray('string')).toThrow();
    });

    test('if parameter is not 2d array should throw error', () => {
        expect(() => utils.clear2dArray([5, 4])).toThrow();
        expect(() => utils.clear2dArray([[1, 2], 5])).toThrow();
    });
    
    test('if array is [[2, 3], [2, 5]] should return [[null, null], [null, null]]', () => {
        const size = [[2, 3], [2, 5]];
        const expectedArray = [[null, null], [null, null]];
        expect(utils.clear2dArray(size)).toEqual(expectedArray);
    });
    
    test('if array is [[3, 2, 5], [4, 3, 8]] should return [[null, null], [null, null]]', () => {
        const size = [[3, 2, 5], [4, 3, 8]];
        const expectedArray = [[null, null, null], [null, null, null]];
        expect(utils.clear2dArray(size)).toEqual(expectedArray);
    });
});

describe('to1dArray', () => {
    test('if parameter is not 2d array should throw error', () => {
        expect(() => utils.to1dArray([5, 4])).toThrow();
        expect(() => utils.to1dArray([[1, 2], 5])).toThrow();
    });
    
    test('if array is [[1, 2], [3, 4]] should return [1, 2, 3, 4]', () => {
        const arr = [[1, 2], [3, 4]];
        const expectedArray = [1, 2, 3, 4];
        expect(utils.to1dArray(arr)).toEqual(expectedArray);
    });
    
    test('if array is [[1, 2, 5], [3, 4, 7]] should return [1, 2, 5, 3, 4, 7]', () => {
        const arr = [[1, 2, 5], [3, 4, 7]];
        const expectedArray = [1, 2, 5, 3, 4, 7];
        expect(utils.to1dArray(arr)).toEqual(expectedArray);
    });
});