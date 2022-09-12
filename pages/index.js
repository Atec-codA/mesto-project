//Объявляем переменые

let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__button-edit');
let popupCloseButton = document.querySelector('.popup__close-icon');

//Задаем функции для открытия и закрытия

function popupOpen() {
  popup.classList.add('popup_opened');
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

//Добавляем обработчик событий для открытия и закрытия

popupOpenButton.addEventListener('click', popupOpen);

popupCloseButton.addEventListener('click', popupClose);

//----------------------------------------------------------------------

//Реализация лайков

let likeButton = document.querySelector('.card__like-button');

function likeButtonClick() {
  
  likeButton.toggleAttribute('card__like-button:active');
}

likeButton.addEventListener('click', likeButtonClick);
