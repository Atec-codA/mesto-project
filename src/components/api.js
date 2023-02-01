const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '84a824a1-ebc5-4e78-9013-e4331df145ed',
    'Content-Type': 'application/json'
  }
};

// Response check

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Get user data

export const getSrvUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse);
}

// Downloading cards from the server

export const getSrvCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse);
}

// Edit avatar

export const changeAvatar = (photo) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: photo
    })
  })
  .then(checkResponse);
}
  
// Edit name and about info

export const editProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse);
}
  
// Add card

export const createNewCard = (link, name) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(checkResponse);
}
  
// Delete card

export const deleteCard = (card) => {
  return fetch(`${config.baseUrl}/cards/${card}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
}
  
// Add like

export const addLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse);
}
  
// Delete like

export const deleteLike = (card) => {
  return fetch(`${config.baseUrl}/cards/likes/${card}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
}