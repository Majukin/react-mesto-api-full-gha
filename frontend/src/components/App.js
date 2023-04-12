import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from "./InfoTooltip";

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import api from '../utils/Api';
import * as auth from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    api.getInitialData()
      .then((data) => {
        const [userData, cardsData] = data;
        setCards(cardsData);
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleCardLike(card) { // ставит/убирает лайк
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleCardDelete(card) { //удаляет карточку
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id)); 
    }).catch((err) => {
      console.error(err);
    });
  }

  function handleUpdateUser(data) {//редактирует профиль
    api.saveUserChanges(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        }).catch ((err) => {
    console.error(err);
  });
}

  function handleUpdateAvatar(data) {//редактирует аватар
    api.changedAvatar(data)
      .then(
        (data) => {
          setCurrentUser(data);
          closeAllPopups();
        }).catch((err) => {
          console.error(err);
        });
  }

  function handleAddPlaceSubmit(data) {//редактирует добавляет карточку
    api.postNewCard(data)
      .then(
        (newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        }).catch((err) => {
          console.error(err);
        });
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  } 

  function handleEditProfilePopupOpen() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlacePopupOpen() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoTooltipPopupOpen(false); 
  }

  function handleOut() { //выход из аккаунта
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/sign-in");
  } 

  function handleRegisterSubmit(email, password) { //регистрация
    auth
      .register(email, password)
      .then((res) => {
        setIsSuccess(true);
        setInfoTooltipPopupOpen(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setIsSuccess(false);
        setInfoTooltipPopupOpen(true);
      });
  }

  function handleLoginSubmit(email, password) { //авторизация
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
      });
  } 

  React.useEffect(() => { // проверка токена
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате");
          }
          console.log("401 — Переданный токен некорректен");
        });
    }
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
         email={email}
         onOut={handleOut}
          />
        <Switch>
          <Route path="/sign-up">
            <Register 
               onRegister={handleRegisterSubmit}
            />
          </Route>
          <Route path="/sign-in">
            <Login 
              onLogin={handleLoginSubmit}
            />
          </Route>
          <ProtectedRoute
            path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfilePopupOpen}
            onAddPlace={handleAddPlacePopupOpen}
            onEditAvatar={handleEditAvatarPopupOpen}
            onCardLike={handleCardLike}
            onCardDeleteRequest={handleCardDelete}
            onCardClick={handleCardClick}
          />
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-up" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser} 
        /> 
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        /> 
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;