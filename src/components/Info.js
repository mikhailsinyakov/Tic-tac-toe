import React from 'react';

export default function Info (props) {

    const { turn, userSymbol } = props;
    const turnMessage = turn == 'user' ? 'Ваш ход' : 'Ход соперника';

    return (
        <div id="info">{turnMessage}</div>
    );
}