import React from 'react';
import utils from '@utils';
import config from '@app/config';
import GameState from '@lib/GameState';
import Info from '@components/Info';
import Field from '@components/Field';
import Cell from '@components/Cell';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cellSymbols: null,
            matchesToWin: null,
            turn: null
        };

        this.fieldWidth = 390;
        this.gameState = new GameState();

        this.makeTurn = this.makeTurn.bind(this);
    }

    initField() {
        this.clearCells();
        this.initTurn();
    }

    clearCells() {
        const cellSymbols = utils.clear2dArray(this.state.cellSymbols);
        this.gameState.updateSymbols(this.props.opponentSymbol, this.props.userSymbol);
        this.gameState.update(cellSymbols);
        this.setState({ cellSymbols });
    }

    initTurn() {
        this.setState({
            turn: this.props.userSymbol == '×' ? 'user' : 'comp'
        });
    }

    makeTurn(row, column, symbol) {
        this.setCellSymbol(row, column, symbol);
        const resultOfGame = this.checkIfGameIsOver();
        if (resultOfGame) {
            this.setState({ turn: null });
            this.props.stopGame(resultOfGame);
        } else this.changeTurn();
    }

    setCellSymbol(row, column, symbol) {
        const cellSymbols = [...this.state.cellSymbols];
        cellSymbols[row][column] = symbol;
        this.gameState.update(cellSymbols);
        this.setState({ cellSymbols });
    }

    changeTurn() {
        const nextTurn = this.state.turn == 'user' ? 'comp' : 'user';
        this.setState({ turn: nextTurn });
    }

    checkIfGameIsOver() {
        const isGameOver = this.gameState.isGameOver();
        if (!isGameOver) return false;
        if (isGameOver.result == 'draw') return 'Ничья';
        else if (isGameOver.result == 'win') return 'Вы выиграли!';
        else return 'Вы проиграли (';
    }

    fieldSizeUpdated() {
        this.initFieldSettings();
        this.updateCSSRule();
    }

    initFieldSettings() {
        const { fieldSize } = this.props;
        const { field, matchesToWin } = config[fieldSize];
        const cellSymbols = utils.createEmpty2dArray(field);
        this.gameState.init(field, matchesToWin);
        this.setState({ cellSymbols, matchesToWin });
    }

    updateCSSRule() {
        const { fieldWidth } = this;
        const { fieldSize } = this.props;
        const { field } = config[fieldSize];
        const fieldHeight = fieldWidth / field[0] * field[1];
        const cellWidth = fieldWidth / field[0]
        
        const sheet = document.styleSheets[1];
        
        for (let key in sheet.rules) {
            const { selectorText } = sheet.rules[key];
            if (selectorText == '#field, #modal' || selectorText == '.cell') {
                sheet.deleteRule(key);
            }
        }

        sheet.insertRule(`#field, #modal { 
            margin-left: -${fieldWidth / 2}px; 
            width: ${fieldWidth}px; 
            height: ${fieldHeight}px; 
            position: absolute;
            left: 50%;
            margin-top: 100px;
        }`);

        sheet.insertRule(`.cell { 
            border: 1px solid #fff;
            text-align: center;
            color: #fff;
            width: ${cellWidth}px;
            height: ${cellWidth}px;
            lineHeight: ${cellWidth * 0.8}px;
            fontSize: ${cellWidth * 0.9}px;
        }`);
        
    }

    makeCompTurn() {
        const [ column, row ] = this.defineBestMove();

        // Simulate delay
        setTimeout(() => this.makeTurn(row, column, this.props.opponentSymbol), 1000);
    }

    defineBestMove() {
        // Create a copy of this.gameState to not mutating the original
        const { fieldSize } = this.props;
        const { field, matchesToWin } = config[fieldSize];

        const gameState = new GameState();
        gameState.init(field, matchesToWin);
        gameState.updateSymbols(this.props.opponentSymbol, this.props.userSymbol);
        gameState.update(this.state.cellSymbols);

        const bestMove = utils.minimax(gameState, 4, true, -Infinity, Infinity);
        return bestMove;
    }

    componentDidMount() {
        this.initFieldSettings();
        this.updateCSSRule();
    }

    componentDidUpdate(prevProps, prevState) {
        const gameStartPlaying = !prevProps.isPlaying && this.props.isPlaying;
        const fieldSizeChanged = prevProps.fieldSize != this.props.fieldSize;
        const compGotTurn = prevState.turn != 'comp' && this.state.turn == 'comp';

        if (gameStartPlaying) this.initField();
        if (fieldSizeChanged) this.fieldSizeUpdated();
        if (compGotTurn) this.makeCompTurn();
    }

    render() {
        const { makeTurn, fieldWidth } = this;
        const { cellSymbols, turn } = this.state;
        const { userSymbol, fieldSize } = this.props;

        const { field } = config[fieldSize];

        const cells = cellSymbols 
            ? utils.to1dArray(cellSymbols).map((val, i) => {
                const row = Math.floor(i / field[0]);
                const column = i % field[0];
                return (<Cell key={i} row={row} column={column} 
                            symbol={val} userSymbol={userSymbol} turn={turn} makeTurn={makeTurn} />);
            }) 
            : null;
        
        return (
            <>
                <Info turn={turn}/>
                <Field>{cells}</Field>
            </>
            
        );
    }
}