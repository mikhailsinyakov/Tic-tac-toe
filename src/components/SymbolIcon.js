import React from 'react';

export default function SymbolIcon(props) {
    const { symbol, fn } = props;
    const className = symbol == 'x' ? "fas fa-times" : "far fa-circle";
    
    return <i className={className} onClick={fn ? () => fn(symbol) : null} ></i>;
}