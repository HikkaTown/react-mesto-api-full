import React from 'react';
function PopupWithForm(props) {
  return (
    <div className={`animation-transition popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <form
          action="#"
          className={`popup__container popup__container_type_${props.name}`}
          name={props.name}
          onSubmit={props.onSubmit}
        >
          <button
            className={`popup__close popup__close_type_${props.name}`}
            type="button"
            onClick={props.onClose}
          ></button>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__submit" type="submit">
            {props.buttonText}
          </button>
        </form>
      </div>
  );
}

export default PopupWithForm;