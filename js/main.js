import Swiper from 'swiper';

let swiperCards = new Swiper('.card__content', {
  loop: true,
  spaceBetween: 32,
  grabCursor: true,
  clickable: true,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});