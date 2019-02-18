import GameBoard from '../lib/GameBoard';

describe('new instance of GameBoard class', () => {
    test('if parameters are not numbers should throw error', () => {
        expect(() => new GameBoard()).toThrow();
        expect(() => new GameBoard('not a number')).toThrow();
    });
    
    test('should return gameBoard instance', () => {
        expect(new GameBoard(2, 3)).toBeInstanceOf(GameBoard);
    });
});

describe('findWinner', () => {
    let gameBoard;
    beforeEach(() => {
        gameBoard = new GameBoard(3, 3);
    });

    afterEach(() => {
        gameBoard = undefined;
    });

    test('gameBoard should have findWinner method', () => {
        expect(typeof gameBoard.findWinner == 'function').toBe(true);
    });
    
    test('if there is no winner should return false', () => {
        expect(gameBoard.findWinner(3)).toBe(false);
    });

    test('if there is the winner should return its symbol', () => {
        gameBoard.addValue(0, 0, 'symbol');
        gameBoard.addValue(1, 0, 'symbol');
        gameBoard.addValue(2, 0, 'symbol');
        expect(gameBoard.findWinner(3)).toBe('symbol');
    });
});

describe('defineGameState', () => {
    let gameBoard;
    beforeEach(() => {
        gameBoard = new GameBoard(3, 3);
    });

    afterEach(() => {
        gameBoard = undefined;
    });

    test('gameBoard should have defineGameState method', () => {
        expect(typeof gameBoard.defineGameState == 'function').toBe(true);
    });

    test('if the board is empty should return {state: "in process"}', () => {
        expect(gameBoard.defineGameState(3)).toEqual({ state: 'in process' });
    });

    test('if the board is empty should return {state: "in process"}', () => {
        expect(gameBoard.defineGameState(3)).toEqual({ state: 'in process' });
    });

    test('if the board is full and there is no winner should return { state: "finished", result: "draw" }', () => {
        gameBoard.addValue(0, 0, 'symbol');
        gameBoard.addValue(1, 0, 6);
        gameBoard.addValue(2, 0, 7);
        gameBoard.addValue(0, 1, 8);
        gameBoard.addValue(1, 1, 6);
        gameBoard.addValue(2, 1, 'symbol');
        gameBoard.addValue(0, 2, 'another symbol');
        gameBoard.addValue(1, 2, 'another symbol');
        gameBoard.addValue(2, 2, 'symbol');
        expect(gameBoard.defineGameState(3)).toEqual({ state: 'finished', result: 'draw' });
    });

    test('if there is the winner should return { state: "finished", result: "win", winner: "symbol" }', () => {
        gameBoard.addValue(0, 0, 'symbol');
        gameBoard.addValue(1, 0, 'symbol');
        gameBoard.addValue(2, 0, 'symbol');
        expect(gameBoard.defineGameState(3)).toEqual({ state: 'finished', result: 'win', winner: 'symbol' });
    });
});

test('should copy the gameBoard when calling static copy method', () => {
    const gameBoard = new GameBoard(3, 3);
    gameBoard.addValue(0, 1, 'some value');
    gameBoard.addValue(0, 2, 5);
    gameBoard.addValue(1, 0, true);
    gameBoard.addValue(1, 1, 6);
    gameBoard.addValue(2, 0, false);
    gameBoard.addValue(2, 1, 8);
    expect(GameBoard.copy(gameBoard)).toEqual(gameBoard);
});