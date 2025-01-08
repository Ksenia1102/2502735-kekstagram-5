import { getRandomNum, getRandomElement } from './math.js';
import { names, descriptions, messages } from './data.js';

function createComment() {
  return {
    id: getRandomNum(1, 1000),
    avatar: `img/avatar-${getRandomNum(1, 6)}.svg`,
    message: getRandomElement(messages),
    name: getRandomElement(names)
  };
}

function createComments() {
  const comments = [];
  const count = getRandomNum(0, 30);

  for (let i = 0; i < count; i++) {
    comments.push(createComment());
  }

  return comments;
}

export function generateObjects() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: getRandomElement(descriptions),
      likes: getRandomNum(15, 200),
      comments: createComments()
    };

    photos.push(photo);
  }

  return photos;
}
