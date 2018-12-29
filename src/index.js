import styles from './main.css';

let h1 = document.querySelector('h1');
if (!h1) {
    h1 = document.createElement('h1');
    h1.innerHTML = 'Крестики-нолики';
    document.body.appendChild(h1);
}

if (module.hot) {
    module.hot.accept('./index.js', () => {

    });
}