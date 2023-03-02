export class Popup {
    constructor(selector) {
      this.selector = selector;
      this._popup = document.querySelector(this.selector);
      this._form = this._popup.querySelector('.popup__form');
      this._handleEscClose = this._handleEscClose.bind(this);
    }
  
    open() {
      this._popup.classList.add("popup_opened");
      document.addEventListener("keydown", this._handleEscClose);
    }
  
    close() {
      this._popup.classList.remove("popup_opened");
      document.removeEventListener("keydown", this._handleEscClose);
    }
  
    _handleEscClose(evt) {
      if (evt.key === "Escape") {
        this.close();
    }}
  
    setEventListeners() {
      this._popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close-icon")) {
          this.close();
        }
      })
    }
  }

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this.image = this._popup.querySelector(".popup__image-zoom");
    this.text = this._popup.querySelector(".popup__image-figcaption");
  }

  open(name, link) { // при открытии попапа вставляет изображение и текст
    super.open();
    this.text.alt = name;
    this.image.src = link;
    this.text.textContent = name;
  }
}

export class PopupWithForm extends Popup {
  constructor(selector, callback) {
    super(selector);
    this._callback = callback;
    this._form = document.querySelector(this.selector).querySelector('.popup__form');
    this._inputs = document.querySelector(this.selector).querySelectorAll('.popup__input');
  }

  _getInputValues() { // приватный метод, собирает данные всех полей формы
    this._inputValues = {};
    this._inputs.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })

    return this._inputValues;
  }

  setEventListener() { // должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы
    super.setEventListener();
    document.querySelector(this.selector).addEventListener("submit", (evt) => {
      this._callback(evt, this._getInputValues());
    })
  }

  close() { // при закрытии попапа форма должна сбрасываться
    super.close();
    this._form.reset();
  }
}