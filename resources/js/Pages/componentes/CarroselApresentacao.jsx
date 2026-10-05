import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

//import './styles.css';

// import required modules
import { Keyboard, Pagination, Navigation, EffectCube, EffectCoverflow, EffectFlip, EffectFade } from 'swiper/modules';

const CarroselApresentacao = (props) => {
  const {lista,pathexibe,efeito} = props
  const imagem  = import.meta.env.VITE_APP_ENDPOINT_IMG

  const CompSwiper = () =>{
    return(
      <Swiper
        effect={efeito}
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        //modules={[Keyboard, Pagination, Navigation,EffectCube]}
        modules={[Keyboard, Navigation, EffectCube, EffectCoverflow, EffectFlip,EffectFade]}
        className="mySwiper"
        >
        {
           lista.map((item,index)=>{
             return(
                <SwiperSlide><img className="img-fluid" src={imagem+pathexibe+item.path}/></SwiperSlide>
             )
           })
        }
      </Swiper>
    )
  }

  return (
    <>
      <CompSwiper/>
      {/* <Swiper
        effect={efeito}
        slidesPerView={1}
        spaceBetween={30}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        //modules={[Keyboard, Pagination, Navigation,EffectCube]}
        modules={[Keyboard, Navigation, EffectCube, EffectCoverflow, EffectFlip, EffectCreative]}
        className="mySwiper"
        >
        {
           lista.map((item,index)=>{
             return(
                <SwiperSlide><img className="img-fluid" src={imagem+pathexibe+item.path}/></SwiperSlide>
             )
           })
        }
      </Swiper> */}
    </>
  );
}
export default CarroselApresentacao
