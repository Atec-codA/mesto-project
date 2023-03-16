export class Card {
  constructor(item, profile, handleCardClick, {myCardDelete, myPushLike, myDeleteLike}) {
    this.item = item;
    this._id = item._id;
    this._name = item.name; 
    this._link = item.link; 
    this.handleCardClick = handleCardClick;
    this.profile = profile; 
    this.myCardDelete = myCardDelete;
    this.myPushLike = myPushLike;
    this.myDeleteLike = myDeleteLike;
    this.element = document.querySelector("#card").content.querySelector(".card").cloneNode(true);
    this.buttonRemove = this.element.querySelector(".card__trash-button");
    this.itemLike = this.element.querySelector(".card__like-button");
    this.countLike = this.element.querySelector(".card__like-num");
    this._title = this.element.querySelector(".card__title");
    this._photo = this.element.querySelector(".card__image");
  }

  generate() { // Generate card
    this._title.textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = this._link;

    if(this.profile.id === this.item.owner._id) { // Add trash button
      this.buttonRemove.classList.add("card__trash-button_type_active");
    }

    if(this.item.likes.length === 0) {
      this.countLike.textContent = "";
    } else {
      this.countLike.textContent = this.item.likes.length;
    }

    this.item.likes.forEach((obj) => { 
      if (Object.values(obj).includes(this.profile.id)) {
        this.itemLike.classList.add("card__like-button_active");
      }
    })

    this._setEventListeners();

    return this.element;
  }

  removeCard() {
    this.element.remove();
  }

  pushMyLike(data) {
    this.itemLike.classList.add("card__like-button_active");
    this.countLike.textContent = data.likes.length;
  }

  deleteMyLike(data) {
    this.itemLike.classList.remove("card__like-button_active");
      if (data.likes.length === 0) {
        this.countLike.textContent = "";
      } else {
        this.countLike.textContent = data.likes.length;
      }
  }

  _setEventListeners() {
    this._photo.addEventListener("click", () => { // Popup with image event listener
      this.handleCardClick.open(this._name, this._link);
    })

    this.buttonRemove.addEventListener("click", (evt) => {  // Popup with image event listener
      this.myCardDelete(this.item);
    });

    this.itemLike.addEventListener("click", (evt) => { // Like event listener
      if (!evt.target.classList.contains("card__like-button_active")) {
        this.myPushLike(this.item);
      } else {
        this.myDeleteLike(this.item);
      }
    })
  }
}