import '../pages/index.css';

// Import from modal.js

import {openPopup, closePopup,} from './modal.js';
import {handleSubmitProfile} from './modal.js';
import {addCard} from './modal.js';

// Import from validate.js

import {enableValidation} from './validate.js';

// Import from constants.js

import {enableValidationSettings} from './constants.js';
import {closeButtons} from './constants.js';
import {popupProfileOpenButton} from './constants.js';
import {popupCardOpenButton} from './constants.js';
import {popupProfile} from './constants.js';
import {popupCard} from './constants.js';
import {jobInput} from './constants.js';
import {nameInput} from './constants.js';
import {profileJob} from './constants.js';
import {profileName} from './constants.js';

// Import from card.js

import {renderCards} from './card.js';


// Listener for open ProfilePopup

popupProfileOpenButton.addEventListener('click', () => {
  openPopup(popupProfile);
  jobInput.value = profileJob.textContent;
  nameInput.value = profileName.textContent;
});

// Listener for open CardPopup

popupCardOpenButton.addEventListener('click', () => {
  openPopup(popupCard);
});

// Listener for close popup's

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
})

// Listener for profile submit button (  )  

popupProfileForm.addEventListener('submit', handleSubmitProfile);

// Listener for card submit button ( card.js )

popupCardForm.addEventListener('submit', addCard);

// Render cards from array ( database.js )

renderCards();

// Enable validation ( validate.js )

enableValidation(enableValidationSettings); 


