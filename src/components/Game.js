import React from 'react';
import GameBoard from '@lib/GameBoard';
import Cell from '@components/Cell';

export default class Game extends React.Component {
    constructor(props) {
        super(props);

        this.fieldSide = 390;
        this.cellsInField = [3, 3];
        this.matchesToWin = 3;

        this.state = {
            board: new GameBoard(this.cellsInField[1], this.cellsInField[0]),
            isUserTurn: this.props.userSymbol == 'x' ? true : false
        };

        this.makeTurn = this.makeTurn.bind(this);
    }

    makeCompTurn() {
        const { state: { board }, props: { opponentSymbol, userSymbol }, matchesToWin } = this;
        const [ column, row ] = board.findBestMove(matchesToWin, opponentSymbol, userSymbol);

        // Simulate delay
        setTimeout(() => this.makeTurn(row, column, opponentSymbol), 1000);
    }

    makeTurn(row, column, symbol) {
        const symbols = ['x', 'o'];
        if (!symbols.includes(symbol)) throw new Error('You should use either "x" or "o" symbol');
        
        const { matchesToWin } = this;
        const { isUserTurn } = this.state;
        const { userSymbol, opponentSymbol, location, history, stopGame } = this.props;

        const board = GameBoard.copy(this.state.board);
        board.addValue(row, column, symbol);
        this.setState({ board });
        
        const gameState = board.defineGameState(matchesToWin, true);
        if (gameState.state == 'in process') {
            this.setState({ isUserTurn: !isUserTurn });
        } else {
            if (gameState.result == 'draw') stopGame('Ничья');
            if (gameState.winner == userSymbol) stopGame('Вы выиграли!');
            if (gameState.winner == opponentSymbol) stopGame('Вы проиграли :(');
            
            history.push(location.pathname.replace('game', 'new-game'));
        }
    }

    componentDidMount() {
        if (!this.state.isUserTurn) this.makeCompTurn();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isUserTurn && !this.state.isUserTurn) this.makeCompTurn();
    }

    render() {
        const { makeTurn} = this;
        const { board, isUserTurn } = this.state;
        const { userSymbol, isPlaying } = this.props;
        const [ columns ] = this.cellsInField;

        const cells = [];
        
        board.getValues().forEach((row, rowIndex) => {
            row.forEach((val, columnIndex) => {
                cells.push(<Cell key={[rowIndex, columnIndex]} row={rowIndex} column={columnIndex} symbol={val} 
                    userSymbol={userSymbol} isUserTurn={isUserTurn} makeTurn={makeTurn} />);
            });
        });
        
        return (
            <main>
                <div id="info">{isUserTurn ? 'Ваш ход' : 'Ожидание хода соперника'}</div>
                <div id="field">{cells}</div>
            </main>
        );
    }
}