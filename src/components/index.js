import '../pages/index.css';
import {cards} from './database.js';
import {enableValidation} from './validate.js';

//Profile PopUp

const popupProfile = document.querySelector('#popupProfile');
const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupProfileForm = popupProfile.querySelector('#popupProfileForm');
const nameInput = popupProfileForm.querySelector('#name-input');
const jobInput = popupProfileForm.querySelector('#about-input');


//Card PopUp

const popupCard = document.querySelector('#popupCard');
const popupCardOpenButton = document.querySelector('#AddButton');
const popupCardForm = popupCard.querySelector('#popupCardForm');
const inputPopupName = popupCard.querySelector('#inputPopupName');
const inputUrl = popupCard.querySelector('#inputUrl');

//Actual Profile name and Job

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

//Cards

const cardsContainer = document.querySelector('.elements__cards');
const cardTemplate = document.querySelector('#card').content;

//Image PopUp

const imagePopup = document.querySelector('.popup_image');
const image = document.querySelector('.popup__image-zoom');
const caption = document.querySelector('.popup__image-figcaption');

//Open and Close PopUp

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('mousedown', closeOverlay);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('mousedown', closeOverlay);
};

popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
});

popupCardOpenButton.addEventListener('click', () => {
  openPopup(popupCard);
});

const closeButtons = document.querySelectorAll('.popup__close-icon');

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})


//Edit profile info

const handleSubmitProfile = (evt) => {
  evt.preventDefault(); 
  profileJob.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  popupProfile.classList.remove('popup_opened');
};

popupProfileForm.addEventListener('submit', handleSubmitProfile);

//Add, delete, likes cards

const createCard = (name, link) => {
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

const renderCard = (card, container) => {
  container.prepend(card);
};

const addCard = (evt) => {
  evt.preventDefault();
  renderCard(createCard(inputPopupName.value, inputUrl.value), cardsContainer);
  inputPopupName.value = '';
  inputUrl.value = '';
  closePopup(popupCard);
};

popupCardForm.addEventListener('submit', addCard);

//Render cards from array

const renderCards = () => {
  cards.forEach((database) =>
    renderCard(createCard(database.name, database.link), cardsContainer)
  );
};

renderCards();

// VALIDATION 

const closeEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
};

const closeOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

enableValidation(); 


