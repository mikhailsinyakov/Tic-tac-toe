import React from 'react';
import { Link } from 'react-router-dom';

export default function Stats(props) {
    const localStats = props.getLocalStats();

    const winWordOptions = ['победа', 'победы', 'побед'];
    const drawWordOptions = ['ничья', 'ничьи', 'ничьих'];
    const lossWordOptions = ['поражение', 'поражения', 'поражений'];

    const defineOption = num => {
        if (num % 10 == 1 && Math.floor(num / 10) != 1) return 0;
        if ([2, 3, 4].includes(num % 10) && Math.floor(num / 10) != 1) return 1;
        return 2;
    };

    const localWins = `${localStats.wins} ${winWordOptions[defineOption(localStats.wins)]}`;
    const localDraws = `${localStats.draws} ${drawWordOptions[defineOption(localStats.draws)]}`;
    const localLosses = `${localStats.losses} ${lossWordOptions[defineOption(localStats.losses)]}`;

    // @TODO Add getExternalStats function
    const externalStats = { wins: 0, draws: 0, losses: 0 };

    const externalWins = `${externalStats.wins} ${winWordOptions[defineOption(externalStats.wins)]}`;
    const externalDraws = `${externalStats.draws} ${drawWordOptions[defineOption(externalStats.draws)]}`;
    const externalLosses = `${externalStats.losses} ${lossWordOptions[defineOption(externalStats.losses)]}`;

    return (
        <main>
            <h1>Статистика игр</h1>
            <hr/>
            <h2>С компьютером</h2>
            <p>{localWins}, {localDraws} и {localLosses}</p>
            <hr/>
            <h2>С друзьями</h2>
            {props.user 
                ? <p>{externalWins}, {externalDraws} и {externalLosses}</p>
                : <div>Для просмотра информации необходимо авторизоваться <Link to=''>Войти</Link></div>
            }
        </main>
    );
}