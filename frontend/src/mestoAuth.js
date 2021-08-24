const BASE_URL = 'https://api.mesto.praktikum.nomoredomains.rocks';

function _responseValid(res) {
  return  res.ok ? res.json() : Promise.reject(`${res.status}`);
};


export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password: password, email: email})
  })
  .then((res) => _responseValid(res))
  
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email: email, password: password})
  })
  .then((res) => _responseValid(res))
};

export const userInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
    }
  })
  .then((res) => _responseValid(res))
};

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((res) => _responseValid(res))
}