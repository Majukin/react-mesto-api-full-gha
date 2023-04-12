import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input id="avatar" type="url" className="popup__input popup__input_type_avatar" size="358" name="link" placeholder="Ссылка на изображение" required ref={avatarRef}/>
        <span id="avatar-error" className="popup__span"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;