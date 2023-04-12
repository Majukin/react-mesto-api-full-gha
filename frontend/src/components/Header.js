import React from 'react';
import logo from '../images/logo.svg';
import { Switch, Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img alt="логотип Mesto" src={logo} className="header__logo" />
      <Switch>
        <Route exact path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
        <Route exact path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route exact path="/">
          <div className="header__container">
            <p className="header__email">{props.email}</p>
            <Link to='/sign-in' className="header__link" onClick={props.onOut}>Выйти</Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
