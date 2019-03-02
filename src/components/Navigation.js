import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navigation(props) {
    return (
        <nav>
            <ul>
                <li><NavLink to="/" activeClassName="active">Главная</NavLink></li>
                <li><NavLink to="/stats/" activeClassName="active">Статистика</NavLink></li>
            </ul>
        </nav>
    );
}