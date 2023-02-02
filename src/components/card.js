// Import from constants.js

import {cardTemplate, imagePopup, image, caption} from './constants.js';

// Import from modal.js

import {openPopup} from './modal.js';

// Import from api.js

import {deleteCard, addLike, deleteLike} from "./api.js";


// Add, delete, likes cards

export const createCard = (data, user) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardTrashBtn = cardElement.querySelector('.card__trash-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const cardLikeNum = cardElement.querySelector('.card__like-num');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;
  cardLikeNum.textContent = data.likes.length;

  // Delete user card's

  if (user._id === data.owner._id) {
    cardTrashBtn.classList.add('card__trash-button_type_active');
    cardTrashBtn.addEventListener('click', function () {
      deleteCard(data._id)
        .then(() => {
          removeCard(cardTrashBtn);
        })
        .catch((err) => {
          console.error(err)
        })
    });
  }

  // Active like's on card

  for (const item of data.likes) {
    if (item._id.includes(user._id)) {
      cardLikeBtn.classList.add('card__like-button_active');
    }
  }

  // New like's on card

  cardLikeBtn.addEventListener('click', function (evt) {
    if (!evt.target.classList.contains('card__like-button_active')) {
      addLike(data._id)
        .then((data) => {
          evt.target.classList.add('card__like-button_active');
          cardLikeNum.textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err);
        })
    } else {
      deleteLike(data._id)
        .then((data) => {
          evt.target.classList.remove('card__like-button_active');
          cardLikeNum.textContent = data.likes.length;
        })
        .catch((err) => {
          console.error(err);
        })
    }
  });

  cardImage.addEventListener('click', function () {
    openPopup(imagePopup);
    image.src = data.link;
    image.alt = data.name;
    caption.textContent = data.name;
  });

  return cardElement;
};

// Delete card

function removeCard(card) {
  const element = card.closest('.card');
  element.remove();
};