'use strict';

var PHOTOS_COUNT = 25;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

/**
 * Получение случайного числа.
 * @param {number} min - Минимальное значение.
 * @param {number} max - Максимальное значение.
 * @return {number} Сгенерированное число
 */
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

/**
 * Получение случайного элемнта массива.
 * @param {array} array - Массив для поиска элемента
 * @return {*} - случайный элемент массива
 */
var getRandomValue = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
}

/**
 * Получение случайного числа комментариев.
 * @param {array} comments - Массив комментариев.
 * @return {array} Сгенерированное массив комментариев
 */
var getComments = function (comments) {
  if (getRandomNumber(0, 1)) {
    return [getRandomValue(comments)]
  }
  return [getRandomValue(comments), getRandomValue(comments)];
}

/**
 * Генерирование фотографий.
 * @param {number} photosCount - Число фотографий.
 * @return {number} Сгенерированное число
 */
var generatePhotos = function (photosCount) {
  var photos = [];
  for (var i = 0; i < photosCount; i++) {
    photos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: getRandomNumber(15, 200),
      comments: getComments(COMMENTS)
    }
  }

  return photos;
}

var renderPhoto = function (photo) {
  var pictureTemplate = document.querySelector('#picture-template').content.cloneNode(true);
  pictureTemplate.querySelector('img').src = photo.url;
  pictureTemplate.querySelector('.picture-comments').textContent = photo.comments.length;
  pictureTemplate.querySelector('.picture-likes').textContent = photo.likes;

  return pictureTemplate;
}

var renderPhotos = function (photos) {
  var picturesEl = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }

  picturesEl.appendChild(fragment);
}

var photos = generatePhotos(PHOTOS_COUNT);
renderPhotos(photos);

var galleryOverlayEl = document.querySelector('.gallery-overlay');
galleryOverlayEl.classList.remove('hidden');

galleryOverlayEl.querySelector('.gallery-overlay-image').src = photos[0].url;
galleryOverlayEl.querySelector('.likes-count').textContent = photos[0].likes;
galleryOverlayEl.querySelector('.comments-count').textContent = photos[0].comments.length;
