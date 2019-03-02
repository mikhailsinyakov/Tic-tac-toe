import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
    return (
        <main>
            <h1>Крестики-нолики</h1>
            <h2>Сыграй с компьютером или другим человеком</h2>
            <Link to='/new-game/vs-AI'>Играть с компьютером</Link>
            {props.user 
                ? <Link to='/new-game/vs-person'>Играть с другим человеком</Link>
                : <div>Для игры с другим человеком необходимо авторизоваться. <Link to=''>Войти</Link></div>
            }
        </main>
    );
}