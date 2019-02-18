import React from 'react';

export default function Menu(props) {
    const { isPlaying } = props;
    if (isPlaying) {
        return null;
    }
    
    const { prevResult, startGame } = props;

    let title, question, options;

    if (prevResult) {
        title = <div id="title">{prevResult}</div>;
        question = <div id="question">Сыграть еще?</div>;
        options = <div id="options"><i onClick={() => startGame()}>OK</i></div>;
    } else {
        title = <div id="title">Крестики-нолики</div>;
        question = (
            <div id="question">
                Выберите <i className="fas fa-times"></i> или <i className="far fa-circle"></i>
            </div>
        );

        options = (
            <div id="options">
                <i className="fas fa-times" onClick={() => startGame('×')}></i>
                <i className="far fa-circle" onClick={() => startGame('○')}></i>
            </div>
        );
    }

    return (
        <div id="menu">
            {title}
            {question}
            {options}
        </div>
    );
}