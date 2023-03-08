export class FormValidator {

  constructor(settings, form) {
    this._inputSelector = settings.inputSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._form = form; 
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); 
    this._buttonElement = this._form.querySelector(this._submitButtonSelector); 
  }

  _showInputError(inputElement, errorElement) { 
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideInputError(inputElement, errorElement) { 
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _disableButton() { 
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() { 
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  toggleButtonState() { 
    if(this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _checkInputValidity(inputElement, errorElement) { 
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

  resetValidation() {
    this.toggleButtonState();
    this._inputList.forEach((input) => {
      const errorElement = this._form.querySelector(`.${input.id}-error`);
      this._hideInputError(input, errorElement);
    });
  }

  _hasInvalidInput() { 
    return this._inputList.some((input) => !input.validity.valid);
  }

  _handleFormInput(evt) {
    const inputElement = evt.target;
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    this._checkInputValidity(inputElement, errorElement);
    this.toggleButtonState();
  }

  enableValidation() { 
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", (evt) => {
        this._handleFormInput(evt);
      });
    });
  }
}