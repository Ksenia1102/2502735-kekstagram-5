import { showBigPicture } from './big-picture.js';

export function renderMin(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const template = document
    .querySelector('#picture')
    .content.querySelector('.picture');

  const fragment = document.createDocumentFragment();

  picturesContainer.querySelectorAll('.picture').forEach((element) => element.remove());

  photos.forEach(({ url, description, likes, comments }) => {
    const photoElement = template.cloneNode(true);

    const imgElement = photoElement.querySelector('.picture__img');
    imgElement.src = url;
    imgElement.alt = description;

    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent =
      comments.length;

    imgElement.addEventListener('click', () => {
      showBigPicture({ url, description, likes, comments });
    });

    fragment.appendChild(photoElement);
  });

  picturesContainer.appendChild(fragment);
}
