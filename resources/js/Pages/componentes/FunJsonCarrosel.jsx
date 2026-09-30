import React from 'react';

function FunJsonCarrosel() {
  const myData =
  {
        "loop": true,
        "speed": 600,
        "autoplay": {
            "delay": 5000
        },
        "slidesPerView": 1,
        "spaceBetween": 30,
        "pagination": {
            "el": ".swiper-pagination",
            "type": "bullets",
            "clickable": true
        },
        "breakpoints": {
            "768": {
            "slidesPerView": 2
            },
            "992": {
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

export default FunJsonCarrosel;
