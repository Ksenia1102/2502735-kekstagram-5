const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const PICTURE_COUNT = 10;
const filterElement = document.querySelector('.img-filters');
let currentFilter = Filter.DEFAULT;
let pictures = [];

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const sortRandom = () => Math.random() - 0.5;
const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandom).slice(0, PICTURE_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];
  }
};

const setOnFilterClick = (callback) => {
  filterElement.addEventListener('click', (evt) => {
    const clickedButton = evt.target;

    if (!clickedButton.classList.contains('img-filters__button') || clickedButton.id === currentFilter) {
      return;
    }

    filterElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;

    callback(getFilteredPictures());
  });
};

export const initFilters = (loadedPictures, callback) => {
  pictures = [...loadedPictures];
  filterElement.classList.remove('img-filters--inactive');

  const debouncedCallback = debounce(callback, 500);
  setOnFilterClick(debouncedCallback);
};
