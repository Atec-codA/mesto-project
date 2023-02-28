const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: '84a824a1-ebc5-4e78-9013-e4331df145ed',
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) { // приватный метод - проверка статуса запроса
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getSrvCards() { // загрузка карточек с сервера
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => this._checkResponse(res))
  }

  getSrvUser() { // получение данных о пользователе
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => this._checkResponse(res))
  }

  editProfile(name, about) { // изменение данных пользователи и рода деятельности
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => this._checkResponse(res))
  }

  createNewCard(name, link) { // создание новой карточки
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this._checkResponse(res))
  }

  addLike(card) { // добавление лайка фотографии
    return fetch(`${this.baseUrl}/cards/likes/${card}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(res => this._checkResponse(res))
  }

  deleteLike(card) { // удаление лайка с фотографии
    return fetch(`${this.baseUrl}/cards/likes/${card}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => this._checkResponse(res))
  }

  deleteCard(card) { // удаление карточки
    return fetch(`${this.baseUrl}/cards/${card}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => this._checkResponse(res))
  }

  changeAvatar(photo) { // изменить аватар
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: photo
      })
    })
    .then(res => this._checkResponse(res))
  }
}

export const api = new Api(config);
