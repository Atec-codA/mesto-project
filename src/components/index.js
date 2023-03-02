import '../pages/index.css';

// Import from validate.js

import {FormValidator} from './FormValidator.js';

// Import from userinfo.js

import { UserInfo } from "./Userinfo.js";

// Import from constants.js
// remove popupProfile,//

import {enableValidationSettings as settings, popupProfileOpenButton, popupCardOpenButton, popupCard, jobInput, nameInput, profileJob, profileName, popupCardForm, avatarForm, avatarSubmitBtn, profileAvatar, profileSubmitBtn, cardSubmitBtn, formElement, profile} from './constants.js';

// Import from popup.js

import { PopupWithImage, PopupWithForm } from "./Popup.js";

// Import from card.js

import {Card} from './Card.js';

// Import from api.js

import {Api, config} from "./Api.js";

// Import from Section.js

import { Section } from "./Section.js";

// Create classes

const userInfo = new UserInfo(profile, profileName, profileJob, profileAvatar);
const api = new Api(config);
const popupFullImage = new PopupWithImage(".popup_image");
let cardElement;
let section;

// Start validation

const profileValidate = new FormValidator(settings, formElement);
profileValidate.enableValidation();
const addCardValidate = new FormValidator(settings, popupCard);
addCardValidate.enableValidation();
const profilePhotoValidate = new FormValidator(settings, avatarForm);
profilePhotoValidate.enableValidation();

// Load data and cards from server

Promise.all([api.getSrvUser(), api.getSrvCards()])
  .then(([srvUser, cards]) => {
    userInfo.setUserInfo(srvUser);
    section = new Section({
      renderer: (item) => {
        cardElement = createCard(item);
        section.addItem(cardElement);
      }
    }, '.elements__cards');
    section.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
})

// Render loading

const renderLoading = (button ,bolean) => {
  if(bolean) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

// Edit popup profile

const popupEditProfile = new PopupWithForm("#popupProfile", 
  {handleFormSubmit: (evt) =>
    {evt.preventDefault();
    renderLoading(profileSubmitBtn, true);
    api.editInfoUser(popupEditProfile.getInputValues())
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        renderLoading(profileSubmitBtn, false);
      })}
});
popupEditProfile.setEventListeners();

// Edit avatar

const popupEditPhoto = new PopupWithForm(".popup_avatar", 
  {handleFormSubmit: (evt) =>
    {evt.preventDefault();
    renderLoading(avatarSubmitBtn, true);
    api.changePhoto(popupEditPhoto.getInputValues())
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditPhoto.close();
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        renderLoading(avatarSubmitBtn, false);
      })}
});
popupEditPhoto.setEventListeners();

// Add new card popup

const popupNewCard = new PopupWithForm("#popupCard",  
  {handleFormSubmit: (evt) => {
  evt.preventDefault();
  renderLoading(cardSubmitBtn, true);
  api.createNewCard(popupNewCard.getInputValues())
    .then((item) => {
      popupCardForm.reset();
      cardElement = createCard(item);
      section.addItem(cardElement);
      popupNewCard.close();
    })
    .catch((err) => {
      console.error(err)
    })
    .finally(() => {
      renderLoading(cardSubmitBtn, false);
    })
  }}
);
popupNewCard.setEventListeners();

// Add new card

const createCard = (item) => {
  const createCardItem = new Card(item, profile, popupFullImage, 
    {myCardDelete: (item) => {
      api.deleteCard(item._id)
    .then(() => {
      createCardItem.removeCard();
    })
    .catch((err) => {
      console.error(err);
    })
    },
    myPushLike: (item) => {
      api.addLike(item._id)
        .then((data) => {
          createCardItem.pushMyLike(data);
        })
        .catch((err) => {
          console.error(err)
        })},
    myDeleteLike: (item) => {
      api.deleteLike(item._id)
        .then((data) => {
          createCardItem.deleteMyLike(data);
        })
        .catch((err) => {
          console.error(err)
        })
    }});
    console.log();
    return createCardItem.generate();
}

// Listener for image popup

popupFullImage.setEventListeners();

// Listener for avatar popup

profileAvatar.addEventListener("click", () => {
  profilePhotoValidate.toggleButtonState();
  profilePhotoValidate.resetError();
  popupEditPhoto.open();
})

// Listener for profile popup

popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfile.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
});

// Listener for add card popup

popupCardOpenButton.addEventListener("click", () => {
  addCardValidate.toggleButtonState();
  addCardValidate.resetError();
  popupNewCard.open();
})

