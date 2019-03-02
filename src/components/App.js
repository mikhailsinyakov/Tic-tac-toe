import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from '@components/Header';
import Home from '@components/Home';
import Stats from '@components/Stats';
import NewGame from '@components/NewGame';
import Game from '@components/Game';
import NotFound from '@components/NotFound';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            userSymbol: null,
            opponentSymbol: null,
            prevResult: null
        };

        this.updateSymbols = this.updateSymbols.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.getLocalStats = this.getLocalStats.bind(this);
        this.updateLocalStats = this.updateLocalStats.bind(this);
    }

    updateSymbols(userSymbol) {
        const opponentSymbol = userSymbol == 'x' ? 'o' : 'x';
        this.setState({ userSymbol, opponentSymbol });
    }

    stopGame(result) {
        const possibleResults = ['Ничья', 'Вы выиграли!', 'Вы проиграли :('];
        if (!possibleResults.includes(result)) throw new Error('You should use one of the possible results');
        this.setState({ prevResult: result });
        this.updateLocalStats(result);
    }

    getLocalStats() {
        const statsString = localStorage.getItem('stats');
        if (!statsString) {
            return { wins: 0, draws: 0, losses: 0 };
        }
        return JSON.parse(statsString);
    }

    updateLocalStats(result) {
        const stats = this.getLocalStats();
        if (result == 'Вы выиграли!') {
            stats.wins++;
        } else if (result == 'Ничья') {
            stats.draws++;
        } else {
            stats.losses++;
        }
        const statsString = JSON.stringify(stats);
        localStorage.setItem('stats', statsString);
    }

    render() {
        const { startGame, stopGame, updateSymbols, getLocalStats, updateLocalStats } = this;
        const { user, userSymbol, opponentSymbol, prevResult } = this.state;
        return (
            <Router>
                <>
                    <Switch>
                        <Route path='/game/'></Route>
                        <Route component={Header}></Route>
                    </Switch>
                    <Switch>
                        <Route path='/' exact render={() => <Home user={user} />}></Route>
                        <Route path='/stats/' exact 
                            render={() => <Stats user={user} getLocalStats={getLocalStats} />}>
                        </Route>
                        <Route 
                            path='/new-game/:versus/' exact 
                            render={({match}) => (
                                <NewGame match={match} userSymbol={userSymbol} 
                                    prevResult={prevResult} updateSymbols={updateSymbols} />
                            )}>
                        </Route>
                        <Route 
                            path='/game/:versus/' exact
                            render={({match, location, history}) => (
                                <Game match={match} location={location} history={history} 
                                    userSymbol={userSymbol} opponentSymbol={opponentSymbol} 
                                    stopGame={stopGame} />
                            )}>
                        </Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </>
            </Router>
        );
    }
}