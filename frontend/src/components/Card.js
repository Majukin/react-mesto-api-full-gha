import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);// контекст
  const isLiked = props.card.likes.some(i => i._id === currentUser._id); //проверка лайка
  const cardLikeButtonClassName = `${isLiked ? 'element__like-button element__like-button_active' : 'element__like-button'}`;
  const isOwn = props.card.owner._id === currentUser._id;//проверка карты
  const cardDeleteButtonClassName = `${isOwn ? 'element__delete-button ' : 'element__delete-button element__delete-button_hidden'}`;

  function handleCardClick() {
    props.onCardClick(props.card)
  } 

  function handleLikeClick() { //лайк
    props.onCardLike(props.card)
  }

  function handleDeleteRequest() {//удаление карточки
    props.onCardDeleteRequest(props.card);
  }

  return (
    <div className="element">
      <img
        onClick={handleCardClick} 
        src={props.card.link}
        alt={props.card.name}
        className="element__image"
      />
      <button onClick={handleDeleteRequest} className={cardDeleteButtonClassName} type="button"></button>
      <div className="element__info">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button"></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;