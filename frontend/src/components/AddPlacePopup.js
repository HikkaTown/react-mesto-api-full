import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [cardName, setCardName] = React.useState('');
  const [cardLink, setCardLink] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(cardName, cardLink);
    setCardName('');
    setCardLink('');
  }
  return (
    <PopupWithForm 
      name="add-card" 
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name-card"
        id="name-card-input"
        required
        minLength="2"
        maxLength="30"
        type="text"
        name="name"
        placeholder="Название"
        value={cardName}
        onChange={(e) => {
          setCardName(e.target.value);
        }}
      />
      <span className="popup__error name-card-input-error"></span>
      <input
        className="popup__input popup__input_type_url-img"
        id="url-img-input"
        required
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={cardLink}
        onChange={(e) => {
          setCardLink(e.target.value);
        }}
      />
      <span className="popup__error url-img-input-error"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;