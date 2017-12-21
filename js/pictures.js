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

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

var getComments = function (comments) {
  var commentsLength = comments.length;
  var commentsCount = getRandomNumber(1, 3);
  return commentsCount;
}

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
  pictureTemplate.querySelector('.picture-comments').textContent = photo.comments;
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

renderPhotos(generatePhotos(PHOTOS_COUNT));
