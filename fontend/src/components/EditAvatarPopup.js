import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarLink = React.useRef(null)
  function handleSubmit(e) {
    e.preventDefault();
    
    props.onUpdateAvatar(avatarLink.current.value);
  }
  return(
    <PopupWithForm 
        name="add-avatar" 
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input  
          className="popup__input popup__input_type_url-avatar"
          id="url-avatar-input"
          required
          type="url"
          name="link"
          ref={avatarLink}
          defaultValue={null}
          placeholder="Ссылка на фотографию"
        />
        <span className="popup__error url-avatar-input-error"></span>
      </PopupWithForm>
  )
}

export default EditAvatarPopup;