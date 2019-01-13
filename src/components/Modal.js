import React from 'react';

export default function Modal(props) {
    const { isPlaying } = props;
    if (isPlaying) {
        return null;
    }
    
    const { prevResult, swapSymbols, setSymbols, startGame } = props;
    const restartGame = () => {
        swapSymbols();
        startGame();
    };
    const runGame = symbol => {
        setSymbols(symbol);
        startGame();
    };

    let title, question, options;

    if (prevResult) {
        title = <div id="title">{prevResult}</div>;
        question = <div id="question">Сыграть еще?</div>;
        options = <div id="options"><i onClick={restartGame}>OK</i></div>;
    }

    title = <div id="title">Крестики-нолики</div>;
    question = (
        <div id="question">
            Выберите <i className="fas fa-times"></i> или <i className="far fa-circle"></i>
        </div>
    );

    options = (
        <div id="options">
            <i className="fas fa-times" onClick={() => runGame('×')}></i>
            <i className="far fa-circle" onClick={() => runGame('○')}></i>
        </div>
    );

    return (
        <div id="modal">
            {title}
            {question}
            {options}
        </div>
    );
}