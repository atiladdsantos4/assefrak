import React from 'react';

function FunJsonLivro() {
  const myData =
  {
    "loop": true,
    "speed": 800,
    "autoplay": {
        "delay": 4000
    },
    "slidesPerView": 1,
    "spaceBetween": 30,
    "navigation": {
        "nextEl": ".swiper-button-next",
        "prevEl": ".swiper-button-prev"
    },
    "breakpoints": {
        "768": {
        "slidesPerView": 2
        },
        "1024": {
        "slidesPerView": 3
        }
    }
  }

  return (
    <script
      type="application/json"
      class="swiper-config"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(myData) }}
    />
  );
}

export default FunJsonLivro;
