import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
function EditProfilePopup(props) {
  const userData = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState();
  const [about, setAbout] = React.useState();
  React.useEffect(() => {
    setName(userData.name);
    setAbout(userData.about)
  }, [userData, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    
    props.onUpdateUser(name, about);
  }
  return (
    <PopupWithForm
        name="edit-profile" 
        title="Редактировать профиль" 
        buttonText="Сохранить"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        >
        <input
          className="popup__input popup__input_type_name"
          id="name-input"
          required
          type="text"
          minLength="2"
          maxLength="40"
          name="nameProfile"
          placeholder="Имя"
          value={name || ''}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <span className="popup__error name-input-error"></span>
        <input
          className="popup__input popup__input_type_job"
          id="job-input"
          required
          type="text"
          minLength="2"
          maxLength="200"
          name="jobProfile"
          placeholder="Вид деятельности"
          value={about || ''}
          onChange={(e) => {
            setAbout(e.target.value);
          }}
        />
        <span className="popup__error job-input-error"></span>
      </PopupWithForm>
  )
}

export default EditProfilePopup;