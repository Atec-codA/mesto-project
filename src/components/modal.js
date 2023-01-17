// Import from constants.js

import {jobInput} from './constants.js';
import {nameInput} from './constants.js';
import {profileJob} from './constants.js';
import {profileName} from './constants.js';
import {inputPopupName} from './constants.js';
import {cardsContainer} from './constants.js';
import {inputUrl} from './constants.js';

// Import from card.js

import {renderCard} from './card.js';
import {createCard} from './card.js';

// Edit profile info

export const handleSubmitProfile = (evt) => {
  evt.preventDefault(); 
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  popupProfile.classList.remove('popup_opened');
};

// Create new card

export const addCard = (evt) => {
  evt.preventDefault();
  renderCard(createCard(inputPopupName.value, inputUrl.value), cardsContainer);
  inputPopupName.value = '';
  inputUrl.value = '';
  closePopup(popupCard);
};

// Open popup

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('mousedown', closeOverlay);
};

// Close popup

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('mousedown', closeOverlay);
};

// Close popup from Esc

const closeEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Close popup from overlay click

const closeOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};