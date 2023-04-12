import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}></button>
          <img src={currentUser.avatar} alt="аватарка" className="profile__avatar-image" />
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements">
        {props.cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardLike={props.onCardLike}
            onCardDeleteRequest={props.onCardDeleteRequest}
            onCardClick={props.onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;