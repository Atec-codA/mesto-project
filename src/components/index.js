import '../pages/index.css';

// Import from modal.js

import {openPopup,} from './modal.js';

// Import from validate.js

import {FormValidator} from './validate.js';

// Import from userinfo.js

import { UserInfo } from "./userinfo.js";

// Import from constants.js
// remove popupProfile,//

import {enableValidationSettings as settings, popupProfileForm, popupProfileOpenButton, popupCardOpenButton, popupCard, jobInput, nameInput, profileJob, profileName, popupCardForm, avatarPopup, avatarForm, avatarPhotoInput, avatarSubmitBtn, profileAvatar, profileSubmitBtn, cardSubmitBtn, inputPopupName, inputUrl, cardsContainer} from './constants.js';

// Import from popup.js

import { Popup, PopupWithImage, PopupWithForm } from "./popup.js";

// Import from card.js

import {createCard, Card} from './card.js';

// Import from api.js

import {Api, config} from "./api.js";

// User data
const fullImage = document.querySelector(".popup__image-zoom"); // фотография полноэкранного изображения
const imageOpenFullDescription = document.querySelector(".popup__image-figcaption"); //подпись фото из третьего попапа
const userInfo = new UserInfo(user, profileName, profileJob, profileAvatar);
const api = new Api(config);


const popupProfile = new Popup("#popupProfile");
const popupAddCard = new Popup("#popupCard");
const popupFullImage = new PopupWithImage(".popup_image", { fullImage, imageOpenFullDescription });
const popupAvatar = new Popup(".popup_avatar");



let user = {};


// Load data and cards from server

Promise.all([api.getSrvUser(), api.getSrvCards()])
  .then(([srvUser, cards]) => {
    // user = srvUser;
    // profileName.textContent = user.name;
    // profileJob.textContent = user.about;
    // profileAvatar.src = user.avatar;
    userInfo.setUserInfo(srvUser);

    cards.reverse().forEach((data) => {
      cardsContainer.prepend(createCard(data, user));
    })
  })
  .catch((err) => {
    console.error(err);
})



const popupEditProfile = new PopupWithForm("#popupProfile", (evt, getInputs) => {
  evt.preventDefault();
  profileSubmitBtn.textContent = 'Сохранение...';
  api.editProfile(getInputs.name, getInputs.job)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      profileSubmitBtn.textContent = 'Сохранить';
    });
  
  });

// Edit avatar

function changeAvatarProfile(evt) {
  evt.preventDefault();
  avatarSubmitBtn.textContent = 'Сохранение...';
  const avatar = avatarPhotoInput.value;
  api.changeAvatar(avatar)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
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
      popupAddCard.close();
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
  popupEditProfile.open();
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
});

// Listener for open CardPopup

popupCardOpenButton.addEventListener('click', () => {
  const submButton = popupCard.querySelector(settings.submitButtonSelector);
  openPopup(popupCard);
  popupCardForm.reset();
});

// Listener for open Avatar popup

profileAvatar.addEventListener('click', function() {
  const submButton = avatarPopup.querySelector(settings.submitButtonSelector);
  popupAvatar.open();
});

// Listener for profile submit button (  )  

popupProfileForm.addEventListener('submit', popupEditProfile);

// Listener for card submit button ( card.js )

popupCardForm.addEventListener('submit', addNewCard);

// Render cards from array ( database.js )

avatarForm.addEventListener('submit', changeAvatarProfile);

// Enable validation ( validate.js )

const formElement = document.querySelector(".popup__form");

const profileValidate = new FormValidator(settings, formElement);
profileValidate.enableValidation();
const addCardValidate = new FormValidator(settings, popupCard);
addCardValidate.enableValidation();
const profilePhotoValidate = new FormValidator(settings, avatarForm);
profilePhotoValidate.enableValidation();