import galleryItems from "./app.js";

// Отримуємо елементи
const gallery = document.querySelector(".js-gallery");
const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeButton = document.querySelector(".lightbox__button");
const overlay = document.querySelector(".lightbox__overlay");


const galleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  })
  .join("");

gallery.innerHTML = galleryMarkup;


function openModal(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") return;

  lightbox.classList.add("is-open");
  lightboxImage.src = event.target.dataset.source;
  lightboxImage.alt = event.target.alt;

  window.addEventListener("keydown", onEscPress);
}


function closeModal() {
  lightbox.classList.remove("is-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";

  window.removeEventListener("keydown", onEscPress);
}


function onEscPress(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}


gallery.addEventListener("click", openModal);
closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
