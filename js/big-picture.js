export function showBigPicture({ url, description, likes, comments }) {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialComments = bigPicture.querySelector('.social__comments');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const commentCountBlock = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const body = document.body;
  const closeButton = bigPicture.querySelector('#picture-cancel');

  let currentIndex = 0;
  const COMMENTS_UPLOADED_COUNT = 5;

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  function updateComments() {
    const commentsFragment = document.createDocumentFragment();
    const commentsToShow = comments.slice(
      currentIndex,
      currentIndex + COMMENTS_UPLOADED_COUNT
    );

    commentsToShow.forEach(({ avatar, name, message }) => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');

      const commentImg = document.createElement('img');
      commentImg.classList.add('social__picture');
      commentImg.src = avatar;
      commentImg.alt = name;

      const commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = message;

      commentElement.appendChild(commentImg);
      commentElement.appendChild(commentText);
      commentsFragment.appendChild(commentElement);
    });

    socialComments.appendChild(commentsFragment);

    currentIndex += COMMENTS_UPLOADED_COUNT;

    const displayedComments = Math.min(currentIndex, comments.length);
    commentCountBlock.innerHTML = `${displayedComments} из <span class='comments-count'>${comments.length}</span> комментариев`;

    if (currentIndex >= comments.length) {
      commentsLoader.classList.add('hidden');
    }
  }

  function onCommentsLoaderClick() {
    updateComments();
  }

  function onEscPress({ key }) {
    if (key === 'Escape') {
      closeBigPicture();
    }
  }

  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  }

  function onCloseBigPicture() {
    closeBigPicture();
  }

  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  socialComments.innerHTML = '';
  currentIndex = 0;
  updateComments();

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  closeButton.addEventListener('click', onCloseBigPicture);
  document.addEventListener('keydown', onEscPress);
}
