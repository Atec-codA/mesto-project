import { config } from '../utils/constants.js';

export class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) { // Check server response
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getSrvCards() { // Load cards from server
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then(res => this._checkResponse(res))
  }

  getSrvUser() { // Get user data from server
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then(res => this._checkResponse(res))
  }

  editProfile(data) { // Profile edit
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job
      })
    })
    .then(res => this._checkResponse(res))
  }

  createNewCard(data) { // Create new card
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.place,
        link: data.link
      })
    })
    .then(res => this._checkResponse(res))
  }

  addLike(card) { // Add like
    return fetch(`${this.baseUrl}/cards/likes/${card}`, {
      method: 'PUT',
      headers: this.headers
    })
    .then(res => this._checkResponse(res))
  }

  deleteLike(card) { // Delete like
    return fetch(`${this.baseUrl}/cards/likes/${card}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => this._checkResponse(res))
  }

  deleteCard(card) { // Delete card
    return fetch(`${this.baseUrl}/cards/${card}`, {
      method: 'DELETE',
      headers: this.headers
    })
    .then(res => this._checkResponse(res))
  }

  changePhoto(data) { // Change avatar
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.photo
      })
    })
    .then(res => this._checkResponse(res))
  }
}