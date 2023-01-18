// Validation ( validate.js ) 

export const enableValidationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_type_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_type_active'
};

// Profile PopUp ( modal.js )

export const popupProfile = document.querySelector('#popupProfile');
export const popupProfileOpenButton = document.querySelector('.profile__button-edit');
export const popupProfileForm = popupProfile.querySelector('#popupProfileForm');
export const nameInput = popupProfileForm.querySelector('#name-input');
export const jobInput = popupProfileForm.querySelector('#about-input');


// Card PopUp ( modal.js )

export const popupCard = document.querySelector('#popupCard');
export const popupCardOpenButton = document.querySelector('#AddButton');
export const popupCardForm = popupCard.querySelector('#popupCardForm');
export const inputPopupName = popupCard.querySelector('#card-name');
export const inputUrl = popupCard.querySelector('#input-url');

// Actual Profile name and Job ( modal.js )

export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');

// Constants for render card's ( cards.js )

export const cardsContainer = document.querySelector('.elements__cards');
export const cardTemplate = document.querySelector('#card').content;

// Image PopUp ( modal.js )

export const imagePopup = document.querySelector('.popup_image');
export const image = document.querySelector('.popup__image-zoom');
export const caption = document.querySelector('.popup__image-figcaption');

export const closeButtons = document.querySelectorAll('.popup__close-icon');