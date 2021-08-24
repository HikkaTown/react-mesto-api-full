import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';
function Main(props) {
  const userData = useContext(CurrentUserContext);
  const cards = props.cardList;
  
  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-content">
          <div style={{backgroundImage: `url(${userData.avatar})`}} className="profile__avatar"></div>
          <div className="profile__avatar-overlay" onClick={() => {
            props.onEditAvatar()}}>
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userData.name}</h1>
          <button className="profile__edit-btn" 
            onClick={() => 
              {props.onEditProfile();}
            } 
            type="button"
          >
          </button>
          <p className="profile__job">{userData.about}</p>
        </div>
        <button className="profile__add-btn"
          onClick={() => {
            props.onAddPlace();
          }} 
          type="button">
        </button>
      </section>
      <section className="photocard">
        <ul className="photocard__items">
          {
          cards.length !== 0 ? cards.map((data) => (
            <Card key={data._id}
             card={data} 
             onCardLike={props.onCardLike} 
             onCardDelete={props.onCardDelete}
             handleClick={props.onCardClick}/>
          )
          )
           : ''}
        </ul>
      </section>
    </main>
  );
}

export default Main;