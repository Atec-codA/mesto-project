export class FormValidator {

  constructor(settings, form) {
    this._inputSelector = settings.inputSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._form = form; // форма, где запускаем валидацию
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); // список инпутов в форме
    this._buttonElement = this._form.querySelector(this._submitButtonSelector); // кнопка сабмит
  }

  _showInputError(inputElement, errorElement) { // приватный метод - показать текст ошибки
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement, errorElement) { // приватный метод - скрыть текст ошибки
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _disableButton() { // приватный метод - деактивировать кнопку
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() { // приватный метод - активировать кнопку
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  toggleButtonState() { // метод - переключатель кнопки
    if(this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _checkInputValidity(inputElement, errorElement) { // приватный метод - проверки валидации
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if(inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      this._showInputError(inputElement, errorElement);
    }
  }

  resetError() {
    this.toggleButtonState();
    this._inputList.forEach((input) => {
      const errorElement = this._form.querySelector(`.${input.id}-error`);
      this._hideInputError(input, errorElement);
    });
  }

  _hasInvalidInput() {  // инпуты, не прошедшие валидацию
    return this._inputList.some((input) => !input.validity.valid);
  }

  _handleFormInput(evt) {
    const inputElement = evt.target;
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this._checkInputValidity(inputElement, errorElement);
    this.toggleButtonState();
  }

  enableValidation() { // публичный метод валидации
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._handleFormInput(evt);
      });
    });
  }
}