const cards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Profile PopUp

const popupProfile = document.querySelector('#popupProfile');
const popupProfileOpenButton = document.querySelector('.profile__button-edit');
const popupProfileCloseButton = document.querySelector('#popupProfileCloseButton');
const popupProfileForm = popupProfile.querySelector('#popupProfileForm');
const nameInput = popupProfileForm.querySelector('#popupInputName');
const jobInput = popupProfileForm.querySelector('#popupInputJob');

//Card PopUp

const popupCard = document.querySelector('#popupCard');
const popupCardOpenButton = document.querySelector('#AddButton');
const popupCardCloseButton = document.querySelector('#popupCardCloseButton');
const popupCardForm = popupCard.querySelector('.popup__form');
const NameInput = popupCard.querySelector('#NameInput');
const UrlInput = popupCard.querySelector('#UrlInput');

//Actual Profile name and Job

const ProfileName = document.querySelector('.profile__title');
const ProfileJob = document.querySelector('.profile__subtitle');

// Cards

const cardsContainer = document.querySelector('.elements__cards');
const cardTemplate = document.querySelector('#card').content;

//Image PopUp

const imageBtnClose = document.querySelector('#image-cls-btn');
const imagePopup = document.querySelector('.popup_image');
const image = document.querySelector('.popup__image-zoom');
const caption = document.querySelector('.popup__image-figcaption');

//Open and Close PopUp

function popupProfileOpen() {
  popupProfile.classList.add('popup_opened');
}

function popupProfileClose() {
  popupProfile.classList.remove('popup_opened');
}

popupProfileOpenButton.addEventListener('click', popupProfileOpen);
popupProfileCloseButton.addEventListener('click', popupProfileClose);

function popupCardOpen() {
  popupCard.classList.add('popup_opened');
}

function popupCardClose() {
  popupCard.classList.remove('popup_opened');
}

popupCardOpenButton.addEventListener('click', popupCardOpen);
popupCardCloseButton.addEventListener('click', popupCardClose);

//Actual Profile name and Job

function formSubmitActualName() {
  jobInput.value = ProfileJob.textContent;
  nameInput.value = ProfileName.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  ProfileJob.textContent = jobInput.value;
  ProfileName.textContent = nameInput.value;
  popupProfile.classList.remove('popup_opened');
  popupCard.classList.remove('popup_opened');
}

popupProfileForm.addEventListener('submit', formSubmitHandler);
popupCardForm.addEventListener('submit', formSubmitHandler);

//Add cards and likes

function createCard(name, link) {
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

  return cardElement;
}

function renderCard(card, container) {
  container.prepend(card);
}

function renderCards() {
  cards.forEach((item) =>
    renderCard(createCard(item.name, item.link), cardsContainer)
  );
}

function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

function addCard(evt) {
  evt.preventDefault();
  renderCard(createCard(NameInput.value, UrlInput.value), cardsContainer);
  NameInput.value = '';
  UrlInput.value = '';
  popupCardClose(popupCard);
}

popupCard.addEventListener('submit', addCard);

renderCards();






