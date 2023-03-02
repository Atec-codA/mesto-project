import '../pages/index.css';

// Import from modal.js

import {openPopup,} from './modal.js';

// Import from validate.js

import {FormValidator} from './validate.js';

// Import from userinfo.js

import { UserInfo } from "./userinfo.js";

// Import from constants.js
// remove popupProfile,//

import {enableValidationSettings as settings, popupProfileForm, popupProfileOpenButton, popupCardOpenButton, popupCard, jobInput, nameInput, profileJob, profileName, popupCardForm, avatarPopup, avatarForm, avatarPhotoInput, avatarSubmitBtn, profileAvatar, profileSubmitBtn, cardSubmitBtn, inputPopupName, inputUrl, cardsContainer, formElement, image, caption} from './constants.js';

// Import from popup.js

import { PopupWithImage, PopupWithForm } from "./popup.js";

// Import from card.js

import {Card} from './card.js';

// Import from api.js

import {Api, config} from "./api.js";

// Import from Section.js

import { Section } from "./Section.js";

// User data

const profile = document.querySelector(".profile"); //профиль пользователя
const fullImage = document.querySelector(".popup__image-zoom"); // фотография полноэкранного изображения
const imageOpenFullDescription = document.querySelector(".popup__image-figcaption"); //подпись фото из третьего попапа
const userInfo = new UserInfo(profile, profileName, profileJob, profileAvatar);
const api = new Api(config);


//const popupProfile = new Popup("#popupProfile");
//const popupAddCard = new Popup("#popupCard");
//const popupFullImage = new PopupWithImage(".popup_image", { image, caption });
//const popupAvatar = new Popup(".popup_avatar");




let cardElement;
let section;

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

const popupFullImage = new PopupWithImage(".popup_image");
popupFullImage.setEventListeners();

const renderLoading = (button ,bolean) => {
  if(bolean) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

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

// Add new card

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

//слушатель на редактирование фото
profileAvatar.addEventListener("click", () => {
  profilePhotoValidate.toggleButtonState();
  profilePhotoValidate.resetError();
  popupEditPhoto.open();
})

// слушатель на кнопку карандаша, который при клике на карандаш вызывает функцию, которая открывает окно формы для редактирования профиля
popupProfileOpenButton.addEventListener("click", () => {
  popupEditProfile.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
});

// cлушатель на кнопку добавления новой карточки
popupCardOpenButton.addEventListener("click", () => {
  addCardValidate.toggleButtonState();
  addCardValidate.resetError();
  popupNewCard.open();
})

const profileValidate = new FormValidator(settings, formElement);
profileValidate.enableValidation();
const addCardValidate = new FormValidator(settings, popupCard);
addCardValidate.enableValidation();
const profilePhotoValidate = new FormValidator(settings, avatarForm);
profilePhotoValidate.enableValidation();