import '../pages/index.css';

// Import from modal.js

import {openPopup, closePopup} from './modal.js';

// Import from validate.js

import {enableValidation, btnDisabled} from './validate.js';

// Import from constants.js

import {enableValidationSettings as settings, popupProfileForm, popupProfileOpenButton, popupCardOpenButton, popupProfile, popupCard, jobInput, nameInput, profileJob, profileName, popupCardForm, avatarPopup, avatarForm, avatarPhotoInput, avatarSubmitBtn, profileAvatar, profileSubmitBtn, cardSubmitBtn, inputPopupName, inputUrl, cardsContainer} from './constants.js';

// Import from card.js

import {createCard} from './card.js';

// Import from api.js

import {api} from "./api.js";

// User data

let user = {};


// Load data and cards from server

Promise.all([api.getSrvUser(), api.getSrvCards()])
  .then(([srvUser, cards]) => {
    user = srvUser;
    profileName.textContent = user.name;
    profileJob.textContent = user.about;
    profileAvatar.src = user.avatar;

    cards.reverse().forEach((data) => {
      cardsContainer.prepend(createCard(data, user));
    })
  })
  .catch((err) => {
    console.error(err);
})

function changeProfile (evt) {
  evt.preventDefault();
  profileSubmitBtn.textContent = 'Сохранение...';
  api.editProfile(nameInput.value, jobInput.value)
    .then(() => {
      profileName.textContent = nameInput.value;
      profileJob.textContent = jobInput.value;
      closePopup(popupProfile);
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      profileSubmitBtn.textContent = 'Сохранить';
    });
  
}

// Edit avatar

function changeAvatarProfile(evt) {
  evt.preventDefault();
  avatarSubmitBtn.textContent = 'Сохранение...';
  const avatar = avatarPhotoInput.value;
  api.changeAvatar(avatar)
    .then((item) => {
      profileAvatar.src = item.avatar;
      avatarForm.reset();
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      avatarSubmitBtn.textContent = 'Сохранить';
    })
}

// Add new card

function addNewCard (evt) {
  evt.preventDefault();
  cardSubmitBtn.textContent = 'Создание...';
  api.createNewCard(inputUrl.value, inputPopupName.value)
    .then((data) => {
      cardsContainer.prepend(createCard(data, user));
      closePopup(popupCard);
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      cardSubmitBtn.textContent = 'Создать';
    });
}

// Listener for open ProfilePopup

popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
});

// Listener for open CardPopup

popupCardOpenButton.addEventListener('click', () => {
  const submButton = popupCard.querySelector(settings.submitButtonSelector);
  openPopup(popupCard);
  popupCardForm.reset();
  btnDisabled(submButton, settings);
});

// Listener for open Avatar popup

profileAvatar.addEventListener('click', function() {
  const submButton = avatarPopup.querySelector(settings.submitButtonSelector);
  openPopup(avatarPopup);
  btnDisabled(submButton, settings);
});

// Listener for profile submit button (  )  

popupProfileForm.addEventListener('submit', changeProfile);

// Listener for card submit button ( card.js )

popupCardForm.addEventListener('submit', addNewCard);

// Render cards from array ( database.js )

avatarForm.addEventListener('submit', changeAvatarProfile);

// Enable validation ( validate.js )

enableValidation(settings); 


