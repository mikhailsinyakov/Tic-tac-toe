import React from 'react';
import { Link } from 'react-router-dom';
import SymbolIcon from '@components/SymbolIcon';

export default function NewGame(props) {
    const { match: { params: { versus } }, userSymbol, prevResult, updateSymbols } = props;

    const handleChange = e => updateSymbols(e.target.value);

    if (versus == 'vs-AI') {
        return (
            <main>
                <h1>{prevResult ? prevResult : 'Новая игра'}</h1>
                <h2>Выберите ваш знак:</h2>
                <label>
                    <input type="radio" name="symbol" value="x" onChange={handleChange} checked={userSymbol == 'x'} />
                    <SymbolIcon symbol="x" />
                </label><br/>
                <label>
                    <input type="radio" name="symbol" value="o" onChange={handleChange} checked={userSymbol == 'o'} />
                    <SymbolIcon symbol="o" />
                </label><br/>
                {userSymbol && <Link to={`/game/${versus}`}>Играть{prevResult && ' еще раз'}</Link>}
            </main>
        );
    }
}