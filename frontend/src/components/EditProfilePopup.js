import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input name="name" id="name" type="text" className="popup__input popup__input_type_name" size="358" required
          minLength="2" maxLength="40" value={name || ""} onChange={handleChangeName}/>
        <span name="errorName" id="name-error" className="popup__span"></span>
      </div>
      <div className="popup__input-container">
        <input name="about" id="job" type="text" className="popup__input popup__input_type_job" size="358" required
          minLength="2" maxLength="200" value={description || ""} onChange={handleChangeDescription}/>
        <span id="job-error" className="popup__span"></span>
      </div>
    </PopupWithForm> 
  );
}

export default EditProfilePopup;