import React from 'react';
import SymbolIcon from '@components/SymbolIcon';

export default function Cell(props) {
    const { row, column, symbol, userSymbol, isUserTurn, makeTurn } = props;

    if (symbol) {
        return (
            <div className="cell" style={({ cursor: 'default' })}>
                <SymbolIcon symbol={symbol}/>
            </div>
        );
    }

    if (!isUserTurn) {
        return <div className="cell" style={({ cursor: 'default' })}></div>;
    }

    return (
        <div className="cell" style={({ cursor: 'pointer' })} onClick={() => makeTurn(row, column, userSymbol)}>
        </div>
    );
}