import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(selector, {handleFormSubmit}) {
    super(selector);
    this._inputs = document.querySelector(this.selector).querySelectorAll('.popup__input');
    this.handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  getInputValues() { // Get input values
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setEventListeners() { // Add event listener and submit
    super.setEventListeners();
    this._form.addEventListener("submit", this.handleFormSubmit);
  }

  close() { // Close and reset form
    super.close();
    this._form.reset();
  }
}