import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound(props) {
    return (
        <main>
            <h2>Такая страница не найдена</h2>
            Вы можете перейти на <Link to='/'>главную страницу</Link>
        </main>
    );
}