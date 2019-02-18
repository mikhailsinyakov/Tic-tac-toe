import React from 'react';
import * as TestRenderer from 'react-test-renderer';
import App from '../components/App';
import Game from '../components/Game';

let testRenderer, testInstance, instance;
beforeEach(() => {
    testRenderer = TestRenderer.create(<App/>);
    testInstance = testRenderer.root;
    instance = testInstance.instance;
});

test('it matches the snapshot', () => {
    expect(testRenderer.toJSON()).toMatchSnapshot();
});

test('when mounted should show menu and field elements and 9 cells', () => {
    const menuElement = testInstance.findByProps({id: 'menu'});
    const fieldElement = testInstance.findByProps({id: 'field'});
    const cellElements = testInstance.findAllByProps({ className: 'cell' });

    expect(menuElement).toBeTruthy();
    expect(fieldElement).toBeTruthy();
    expect(cellElements).toHaveLength(9);
});

describe('startGame method', () => {
    test('when calling without parameter in first time should throw an error', () => {
        expect(() => instance.startGame()).toThrow();
    });

    test('when calling with incorrect parameter should throw an error', () => {
        expect(() => instance.startGame('incorrect')).toThrow();
    });

    test('when calling with proper parameter should not show the menu element', () => {
        instance.startGame('×');
        expect(() => testInstance.findByProps({id: 'menu'})).toThrow();
    });

    test('when calling when the game has already started should throw an error', () => {
        instance.startGame('×');
        expect(() => instance.startGame()).toThrow();
    });

    test('the method should show the correct info message', () => {
        instance.startGame('×');
        let infoElement = testInstance.findByProps({id: 'info'});
        expect(infoElement.children).toEqual(['Ваш ход']);

        instance.stopGame('Ничья');
        instance.startGame('○');
        infoElement = testInstance.findByProps({id: 'info'});
        expect(infoElement.children).toEqual(['Ожидание хода соперника']);
    });

    test('when calling without parameter after symbols has been set should show the correct info message', () => {
        instance.startGame('×');
        instance.stopGame('Ничья');
        instance.startGame();

        const infoElement = testInstance.findByProps({id: 'info'});
        expect(infoElement.children).toEqual(['Ожидание хода соперника']);
    });

    test('when the game starts playing with "x" symbol should show 9 cells with proper style', () => {
        instance.startGame('×');
        const cellElements = testInstance.findAll(child => {
            return child.props.className == 'cell' && child.props.style.cursor == 'pointer';
        });
        expect(cellElements).toHaveLength(9);
    });

    test('when the game starts playing with "○" symbol should only show 9 cells with proper style in 2 seconds', done => {
        instance.startGame('○');
        let cellElements = testInstance.findAll(child => {
            return child.props.className == 'cell' && child.props.style.cursor == 'pointer';
        });
        expect(cellElements).toHaveLength(0);
    
        setTimeout(() => {
            cellElements = testInstance.findAll(child => {
                return child.props.className == 'cell' && child.props.style.cursor == 'pointer';
            });
            expect(cellElements).toHaveLength(8);
            done();
        }, 2000);
    });
});

describe('stopGame method', () => {
    test('if game is not playing should throw an error', () => {
        expect(() => instance.stopGame()).toThrow();
    });

    test('if parameter is not one of the possible results should throw an error', () => {
        instance.startGame('×');
        expect(() => instance.stopGame()).toThrow();
        expect(() => instance.stopGame('not possible result')).toThrow();
    });

    test('if parameter is one of the possible results should show that result in title element', () => {
        instance.startGame('×');
        instance.stopGame('Ничья');
        let titleElement = testInstance.findByProps({id: 'title'});
        expect(titleElement.children).toEqual(['Ничья']);
        
        instance.startGame('×');
        instance.stopGame('Вы выиграли!');
        titleElement = testInstance.findByProps({id: 'title'});
        expect(titleElement.children).toEqual(['Вы выиграли!']);
        
        instance.startGame('×');
        instance.stopGame('Вы проиграли :(');
        titleElement = testInstance.findByProps({id: 'title'});
        expect(titleElement.children).toEqual(['Вы проиграли :(']);
    });
});

describe('Game\'s makeTurn method', () => {
    let gameInstance;
    beforeEach(() => {
        gameInstance = testInstance.findByType(Game).instance;
    });

    test('if given not proper parameters should throw an error', () => {
        instance.startGame('×');
        expect(() => gameInstance.makeTurn(3, 2, '○')).toThrow();
        expect(() => gameInstance.makeTurn(1, 4, '○')).toThrow();
        expect(() => gameInstance.makeTurn(1, 1, '5')).toThrow();
    });

    test('if given proper parameters chosen cell should has specified symbol', () => {
        instance.startGame('×');
        gameInstance.makeTurn(1, 1, '×');
        
        const cellComponent = testInstance.findByProps({row: 1, column: 1});
        const cellElement = cellComponent.findByProps({ className: 'fas fa-times'});
        expect(cellElement).toBeTruthy();
    });

    test('if chosen cell has already symbol should throw an error', () => {
        instance.startGame('×');
        gameInstance.makeTurn(1, 1, '×');
        
        expect(() => gameInstance.makeTurn(1, 1, '○')).toThrow();
    });
});