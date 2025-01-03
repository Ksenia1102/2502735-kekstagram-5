const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

const scaleStep = 25;
const scaleMin = 25;
const scaleMax = 100;
let currentScale = 100;

const EFFECTS = [
  { name: 'none', style: 'none', min: 0, max: 0, step: 0, unit: '' },
  { name: 'chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'sepia', style: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  { name: 'marvin', style: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  { name: 'phobos', style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  { name: 'heat', style: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imagePreview.style.transform = `scale(${currentScale / 100})`;
};

scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > scaleMin) {
    currentScale -= scaleStep;
    updateScale();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < scaleMax) {
    currentScale += scaleStep;
    updateScale();
  }
});

const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  if (isDefault()) {
    effectLevelContainer.classList.add('hidden');
    effectLevelSlider.noUiSlider.set(chosenEffect.min);
    return;
  }
  effectLevelContainer.classList.remove('hidden');
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });
};

const applyEffect = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  if (isDefault()) {
    imagePreview.style.filter = '';
    imagePreview.className = '';
  } else {
    imagePreview.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
    imagePreview.className = `effects__preview--${chosenEffect.name}`;
  }
  effectLevelValue.value = sliderValue;
};

const onFormChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);

  effectLevelSlider.noUiSlider.set(chosenEffect.max);

  updateSlider();
  applyEffect();
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

effectLevelSlider.noUiSlider.on('update', applyEffect);
effectsList.addEventListener('change', onFormChange);

export const resetEffects = () => {
  currentScale = 100;
  chosenEffect = DEFAULT_EFFECT;
  updateScale();
  updateSlider();
  applyEffect();
};

export const applyPreviewImage = (src) => {
  imagePreview.src = src;
};

updateSlider();

