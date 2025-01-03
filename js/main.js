import { fetchPhotos } from './server-api.js';
import { renderMin } from './render-min.js';
import { initFilters } from './filter.js';
import './form.js';

let loadedPhotos = [];

const onSuccess = (data) => {
  loadedPhotos = data.slice();
  renderMin(loadedPhotos);
  initFilters(loadedPhotos, (filteredPhotos) => {
    document.querySelectorAll('.picture').forEach((element) => element.remove());
    renderMin(filteredPhotos);
  });
};

const onError = (error) => {
  const errorContainer = document.createElement('div');
  errorContainer.classList.add('data-error');
  errorContainer.textContent = 'Ошибка при загрузке данных';
  errorContainer.style.cssText = `
    color: red;
    text-align: center;
    margin: 20px;
    font-size: 18px;
  `;
  document.body.prepend(errorContainer);
};

fetchPhotos(onSuccess, onError);
