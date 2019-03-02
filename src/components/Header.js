import React from 'react';
import Navigation from '@components/Navigation';

export default function Header(props) {
    return (
        <header>
            <div className="app-name">Крестики-нолики</div>
            <Navigation />
        </header>
    );
}