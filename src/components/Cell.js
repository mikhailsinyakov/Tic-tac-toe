import React from 'react';

export default function Cell(props) {
    const { row, column, userSymbol, turn, makeTurn } = props;

    let symbol = null, onClick = null;
    if (props.symbol) symbol = <i className={props.symbol == '×' ? 'fas fa-times' : 'far fa-circle'}></i>;
    const style = { cursor: !symbol && turn == 'user' ? 'pointer' : 'default' };
    if (!symbol && turn == 'user') onClick = () => makeTurn(row, column, userSymbol);

    return (
        <div className="cell" style={style} onClick={onClick}>{symbol}</div>
    );
}