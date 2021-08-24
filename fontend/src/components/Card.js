import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
export default function Card(props) {
  const userData = useContext(CurrentUserContext);
  const card = props.card;
  
  return (
    <li className="photocard__item">
      {
        card.owner === userData._id ?
        <button 
          type="button"
          onClick={() => {
            props.onCardDelete(card);
          }}
          className="photocard__delet-btn">
        </button>
        : ''
      }
      <div style={{backgroundImage: `url(${card.link})`}}
        className="photocard__image"
        onClick={() => {
          props.handleClick(card)
        }}
        ></div>
      <div className="photocard__content">
        <p className="photocard__title">{card.name}</p>
        <div className="photocard__content-like">
          <button
            onClick={() => {
              props.onCardLike(card)
            }}
            className={`photocard__like-btn ${card.likes.some(owner => 
              owner === userData._id) ?
            'photocard__like-btn_active' : ''}`}
            type="button"
          ></button>
          <p className="photocard__like-value">{`${card.likes.length}`}</p>
        </div>
      </div>
    </li>
  )
}