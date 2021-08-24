import React from 'react';
import logo from '../images/logo.svg';
import { logout } from '../mestoAuth';
import {Link, Route, Switch, useHistory} from 'react-router-dom';

function Header(props) {
  const history = useHistory();
  function handleExitButton() {
    localStorage.removeItem('user');
    // выход с аккаунта
    logout().then(res => {console.log('Успешно вышли')}).catch(e => {console.log('Что-то пошло не так')})
    props.setLoggedIn(false);
    history.push('/sign-in');
  }
  function handleHumburger(e) {
    document.querySelector('.header__hamburger').classList.toggle('header__hamburger_active');
    if(!document.querySelector('.header__content').classList.contains('header__content_visible')) {
      document.querySelector('.header__content').classList.remove('header__content_hidden');
      document.querySelector('.header__content').classList.toggle('header__content_visible');
    } else {
      document.querySelector('.header__content').classList.toggle('header__content_visible');
      document.querySelector('.header__content').classList.toggle('header__content_hidden');

    }
  }
  return (
  <header className={`header ${props.loggedIn ? 'header_loggedin' : ''}`}>
    <img src={logo} alt="Mesto" className="header__logo" />
    <Switch>
      <Route exact={true} path="/sign-in">
        <Link to="/sign-up" className="header__button">Регистрация</Link>
      </Route>
      <Route exact={true} path="/sign-up">
        <Link to="/sign-in" className="header__button">Вход</Link>
      </Route>
      <Route exact={true} path="/">
        <div className="header__content">
          <p className="header__email">
            {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : ''}
          </p>
          <button
            onClick={handleExitButton}
            className="header__button header__button_type_exit">Выход</button>
        </div>
        <div onClick={handleHumburger} className="header__hamburger">
          <span className="header__hamburger-bar"></span>
          <span className="header__hamburger-bar"></span>
          <span className="header__hamburger-bar"></span>
        </div>
      </Route>
    </Switch>
  </header>
  );
}

export default Header