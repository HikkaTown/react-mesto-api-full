import React from "react";

function ImagePopup(props) {
  const cardData = props.card ? props.card : '';
  return (
    <div className={`animation-transition popup popup_type_image ${cardData ? 'popup_opened' : ''}`}>
        <div className="popup__container popup__container_type_image">
          <button
            type="button"
            className="popup__close popup__close_type_image"
            onClick={props.onClose}
          ></button>
          <img src={`${cardData.link}`} alt={cardData.name} className="popup__image" />
          <p className="popup__title-image">{cardData.name}</p>
        </div>
      </div>
  )
}

export default ImagePopup;