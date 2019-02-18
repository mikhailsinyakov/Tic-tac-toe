import React from 'react';
import Game from '@components/Game';
import Menu from '@components/Menu';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            userSymbol: null,
            opponentSymbol: null,
            prevResult: null
        };
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
    }

    startGame(userSymbol) {
        if (this.state.isPlaying) throw new Error('The game has already started');
        if (userSymbol) this.setSymbols(userSymbol);
        else this.swapSymbols();
        this.setState({ isPlaying: true });
    }

    setSymbols(userSymbol) {
        const symbols = ['×', '○'];
        if (!symbols.includes(userSymbol)) throw new Error('You should use either "×" or "○" symbol');
        const opponentSymbol = userSymbol == symbols[0] ? symbols[1] : symbols[0];
        this.setState({ userSymbol, opponentSymbol });
    }

    swapSymbols() {
        const { userSymbol, opponentSymbol } = this.state;
        if (!userSymbol || !opponentSymbol) throw new Error('You can swap symbols only if they have been set earlier');
        this.setState({ userSymbol: opponentSymbol, opponentSymbol: userSymbol });
    }

    stopGame(result) {
        if (this.state.isPlaying == false) throw new Error('The game is not playing yet');
        const possibleResults = ['Ничья', 'Вы выиграли!', 'Вы проиграли :('];
        if (!possibleResults.includes(result)) throw new Error('You should use one of the possible results');
        this.setState({ isPlaying: false, prevResult: result });
    }

    render() {
        const { startGame, stopGame, setSymbols, swapSymbols } = this;
        const { isPlaying, userSymbol, opponentSymbol, prevResult } = this.state;
        return (
            <>
                <Game stopGame={stopGame} isPlaying={isPlaying}
                        userSymbol={userSymbol} opponentSymbol={opponentSymbol} />
                <Menu isPlaying={isPlaying} prevResult={prevResult} startGame={startGame} />
            </>
        );
    }
}