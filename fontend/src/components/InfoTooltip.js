import React from 'react';
function InfoTooltip(props) {
  return(
    <div className={`animation-transition popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <button
          className={`popup__close popup__close_type_${props.name}`}
          type="button"
          onClick={props.onClose}
        ></button>
        {props.typeMessage ? <div className="popup__info-icon popup__info-icon_type_succes"></div> : <div className="popup__info-icon popup__info-icon_type_false"></div> }
        {props.typeMessage ? <p className="popup__info-title">Вы успешно зарегистрировались!</p> : <p className="popup__info-title">Что-то пошло не так! Попробуйте ещё раз.</p>}
      </div>
    </div>
  )
}

export default InfoTooltip;