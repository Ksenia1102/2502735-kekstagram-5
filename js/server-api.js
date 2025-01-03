const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const serverRequest = (route, method = METHOD.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });

const fetchPhotos = (onSuccess, onError) =>
  serverRequest(ROUTE.GET_DATA, METHOD.GET)
    .then((data) => onSuccess(data))
    .catch(onError);

const sendPhotoData = (body, onSuccess, onError) =>
  serverRequest(ROUTE.SEND_DATA, METHOD.POST, body)
    .then((data) => onSuccess(data))
    .catch(onError);

export { fetchPhotos, sendPhotoData };

