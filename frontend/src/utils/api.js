class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  // проверка ответа
  _responseValid(res) {
    return  res.ok ? res.json() : Promise.reject(`${res.status}`);
  }
  // получаем все карточки
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'}
    })
    .then(res =>  this._responseValid(res))
  }
  // получаем информаццию юзера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: {'Content-Type': 'application/json',}
    })
    .then(res =>  this._responseValid(res))
  }
  // Записываем данные на сервер
  setUserData(name, description) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        about: description
      })
    })
    .then(res =>  this._responseValid(res))
  }
  // Сохраняем аватар пользователя
  setUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
    .then(res =>  this._responseValid(res))
  }
  // Добавление карточки
  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res =>  this._responseValid(res))
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
    .then(res =>  this._responseValid(res))
  }

  changeLikeCardStatus(cardId, isLiked) {
    if(isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers,
      })
      .then(res =>  this._responseValid(res))
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        credentials: 'include',
        headers: this._headers
      })
      .then(res =>  this._responseValid(res))
    }
  }
}



const api = new Api({baseUrl: "https://api.mesto.praktikum.nomoredomains.rocks", headers: {
  'Content-Type': 'application/json'
  }}
);

export default api;