import React from 'react';
import PopupWithForm from './PopupWithForm';

function PopupConfirm(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit(props.cardData);
  }
  return (
    <PopupWithForm 
      name="confirm"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Да"
      onSubmit={handleSubmit}
    />
  )
}

export default PopupConfirm;