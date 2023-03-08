import './index.css';

// Import from validate.js

import { FormValidator } from '../components/FormValidator.js';

// Import from userinfo.js

import { UserInfo } from "../components/Userinfo.js";

// Import from constants.js

import { enableValidationSettings as settings, popupProfileOpenButton, popupCardOpenButton, popupCard, jobInput, nameInput, profileJob, profileName, popupCardForm, avatarForm, avatarSubmitBtn, profileAvatar, profileSubmitBtn, cardSubmitBtn, formElement, profile, config } from '../utils/constants.js';

// Import from popup.js

import { PopupWithForm } from "../components/PopupWithForm.js";

// Import from PopupWithImage.js

import { PopupWithImage } from "../components/PopupWithImage.js";

// Import from card.js

import { Card } from '../components/Card.js';

// Import from api.js

import { Api } from "../components/Api.js";

// Import from Section.js

import { Section } from "../components/Section.js";

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
    api.editProfile(popupEditProfile.getInputValues())
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
  profilePhotoValidate.resetValidation();
  popupEditPhoto.open();
})

// Listener for profile popup

popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfile.open();
  const {name, job} = userInfo.getUserInfo()
  nameInput.value = name;
  jobInput.value = job;
});

// Listener for add card popup

popupCardOpenButton.addEventListener("click", () => {
  addCardValidate.toggleButtonState();
  addCardValidate.resetValidation();
  popupNewCard.open();
})