
import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault(evt);
    props.onAddPlace({
      name: name,
      link: link,
    })
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input id="place" type="text" className="popup__input popup__input_type_place" size="358" name="name"
          placeholder="Название" required minLength="2" maxLength="30" value={name} onChange={handleChangeName}/>
        <span id="place-error" className="popup__span"></span>
      </div>
      <div className="popup__input-container">
        <input id="link" type="url" className="popup__input popup__input_type_link" size="358" name="link"
          placeholder="Ссылка на картинку" required value={link} onChange={handleChangeLink}/>
        <span id="link-error" className="popup__span"></span>
      </div>
    </PopupWithForm>
  )
}

export default AddPlacePopup;