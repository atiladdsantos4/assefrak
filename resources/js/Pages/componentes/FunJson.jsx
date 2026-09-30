import React from 'react';

function FunJson() {
  const myData =
  {
    "loop": true,
    "speed": 600,
    "autoplay": {
      "delay": 5000
     },
     "slidesPerView": 1,
     "spaceBetween": 30,
     "navigation": {
        "nextEl": ".swiper-button-next",
        "prevEl": ".swiper-button-prev"
     },
     "breakpoints": {
        "768": {
            "slidesPerView": 2,
            "spaceBetween": 30
        },
        "1200": {
            "slidesPerView": 2,
            "spaceBetween": 40
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

export default FunJson;
