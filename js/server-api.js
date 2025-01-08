const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const serverRequest = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });

const fetchPhotos = (onSuccess, onError) =>
  serverRequest(Route.GET_DATA, Method.GET)
    .then((data) => onSuccess(data))
    .catch(onError);

const sendPhotoData = (body, onSuccess, onError) =>
  serverRequest(Route.SEND_DATA, Method.POST, body)
    .then((data) => onSuccess(data))
    .catch(onError);

export { fetchPhotos, sendPhotoData };
