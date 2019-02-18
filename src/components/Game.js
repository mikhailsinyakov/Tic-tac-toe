import React from 'react';
import GameBoard from '@lib/GameBoard';
import Info from '@components/Info';
import Field from '@components/Field';
import Cell from '@components/Cell';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.fieldSide = 390;
        this.cellsInField = [3, 3];
        this.matchesToWin = 3;

        this.state = {
            board: new GameBoard(this.cellsInField[1], this.cellsInField[0]),
            turn: null
        };

        this.makeTurn = this.makeTurn.bind(this);
    }

    initField() {
        this.setState({
            turn: this.props.userSymbol == '×' ? 'user' : 'comp',
            board: new GameBoard(this.cellsInField[1], this.cellsInField[0])
        });
    }

    makeCompTurn() {
        const { state: { board }, props: { opponentSymbol, userSymbol }, matchesToWin } = this;
        const [ column, row ] = board.findBestMove(matchesToWin, opponentSymbol, userSymbol);

        // Simulate delay
        setTimeout(() => this.makeTurn(row, column, opponentSymbol), 1000);
    }

    makeTurn(row, column, symbol) {
        const symbols = ['×', '○'];
        if (!symbols.includes(symbol)) throw new Error('You should use either "×" or "○" symbol');
        
        const { state: { turn }, props: { stopGame, userSymbol, opponentSymbol, matchesToWin } } = this;

        const board = GameBoard.copy(this.state.board);
        board.addValue(row, column, symbol);
        this.setState({ board });
        
        const gameState = board.defineGameState(matchesToWin);
        if (gameState.state == 'in process') {
            this.setState({ turn: turn == 'user' ? 'comp' : 'user' });
        } else {
            let result;
            if (gameState.result == 'draw') result = 'Ничья';
            if (gameState.winner == userSymbol) result = 'Вы выиграли!';
            if (gameState.winner == opponentSymbol) result = 'Вы проиграли :(';
            this.setState({ turn: null });
            stopGame(result);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const gameStartPlaying = !prevProps.isPlaying && this.props.isPlaying;
        const compGotTurn = prevState.turn != 'comp' && this.state.turn == 'comp';

        if (gameStartPlaying) this.initField();
        if (compGotTurn) this.makeCompTurn();
    }

    render() {
        const { makeTurn, state: { board, turn }, props: { userSymbol, isPlaying } } = this;
        const [ columns ] = this.cellsInField;

        const cells = [];
        
        board.getValues().forEach((row, rowIndex) => {
            row.forEach((val, columnIndex) => {
                cells.push(<Cell key={[rowIndex, columnIndex]} row={rowIndex} column={columnIndex} symbol={val} 
                    userSymbol={userSymbol} turn={turn} makeTurn={makeTurn} />);
            });
        });
        
        return (
            <>
                <Info isPlaying={isPlaying} turn={turn}/>
                <Field>{cells}</Field>
            </>
            
        );
    }
}