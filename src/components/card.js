// Import from database.js

import {cards} from './database.js';

// Import from constants.js

import {cardTemplate} from './constants.js';
import {cardsContainer} from './constants.js';
import {imagePopup} from './constants.js';
import {image} from './constants.js';
import {caption} from './constants.js';

// Import from modal.js

import {openPopup} from './modal.js';

// Add, delete, likes cards

export const createCard = (name, link) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like-button_active');
  });

  cardElement.querySelector('.card__trash-button').addEventListener('click', (e) => {
    e.target.closest('.card').remove();
  });

  cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    image.src = link;
    image.alt = name;
    caption.textContent = name;
  });

  return cardElement;
};

// Create card

export const renderCard = (card, container) => {
  container.prepend(card);
};

// Render cards from array

export const renderCards = () => {
  cards.forEach((database) =>
    renderCard(createCard(database.name, database.link), cardsContainer)
  );
};