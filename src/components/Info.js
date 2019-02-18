import React from 'react';

export default function Info (props) {

    const { isPlaying, turn } = props;
    const turnMessage = isPlaying ? turn == 'user' ? 'Ваш ход' : 'Ожидание хода соперника' : 'Меню';

    return (
        <div id="info">{turnMessage}</div>
    );
}