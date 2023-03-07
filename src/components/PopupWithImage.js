import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.image = this._popup.querySelector('.popup__image-zoom');
    this.text = this._popup.querySelector('.popup__image-figcaption');
  }

  open(name, link) {
    super.open();
    this.image.alt = name;
    this.image.src = link;
    this.text.textContent = name;
  }
}