import React from 'react';
import Game from '@components/Game';
import Modal from '@components/Modal';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldSize: 'small',
            isPlaying: false,
            userSymbol: null,
            opponentSymbol: null,
            prevResult: null
        };
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.setSymbols = this.setSymbols.bind(this);
        this.swapSymbols = this.swapSymbols.bind(this);
    }

    startGame() {
        this.setState({ isPlaying: true });
    }

    stopGame(result) {
        this.setState({ isPlaying: false, prevResult: result });
    }

    setSymbols(userSymbol) {
        const symbols = ['×', '○'];
        const opponentSymbol = userSymbol == symbols[0] ? symbols[1] : symbols[0];
        this.setState({ userSymbol, opponentSymbol });
    }

    swapSymbols() {
        const { userSymbol, opponentSymbol } = this.state;
        this.setState({ userSymbol: opponentSymbol, opponentSymbol: userSymbol });
    }

    render() {
        const { startGame, stopGame, setSymbols, swapSymbols } = this;
        const { isPlaying, userSymbol, opponentSymbol, prevResult, fieldSize } = this.state;
        return (
            <React.Fragment>
                <Game stopGame={stopGame} isPlaying={isPlaying} fieldSize={fieldSize}
                        userSymbol={userSymbol} opponentSymbol={opponentSymbol} />
                <Modal isPlaying={isPlaying} prevResult={prevResult} swapSymbols={swapSymbols} 
                        setSymbols={this.setSymbols} startGame={startGame} />
            </React.Fragment>
        );
    }
}