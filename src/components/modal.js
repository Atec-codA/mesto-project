// Open popup

export const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
  document.addEventListener('mousedown', closeOverlay);
};

// Close popup

export const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
  document.removeEventListener('mousedown', closeOverlay);
};

// Close popup from Esc

const closeEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Close popup from overlay click

const closeOverlay = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};