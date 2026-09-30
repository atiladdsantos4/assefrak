import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import slide1 from '../images/header1.png';
// import slide2 from '../images/header2.png';
// import slide3 from '../images/header3.png';
// import slide4 from '../images/header4.png';
// import slide1 from '../images/carrosel01.jpg';
// import slide2 from '../images/carrosel02.jpg';
// import slide3 from '../images/carrosel03.jpg';
// import slide4 from '../images/carrosel04.jpg';
// import slide5 from '../images/carrosel05.jpg';
// import { DivImagem } from './DivImagem';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

export default function SwiperComp(props) {

  const {path} = props

  const lista =[
    {imagem:path+'carrosel/bemvindo.png'},
    {imagem:path+'carrosel/aviso.png'},
    {imagem:path+'carrosel/programacao_terca.png'},
    {imagem:path+'carrosel/programacao_domingo.png'},
    {imagem:path+'carrosel/preces.png'},
    {imagem:path+'carrosel/estudos.png'},
    {imagem:path+'carrosel/estudos_evangelho.png'},
    {imagem:path+'carrosel/projeto_sementes.png'},
    {imagem:path+'carrosel/projeto_cesta.png'},
    {imagem:path+'carrosel/achados_perdidos.png'},
    {imagem:path+'carrosel/avisos.png'}
  ]


//   const lista1 =[
//     {
//       titulo: 'Research',
//       //img: slide1,
//       img:null,
//       cont:<DivImagem texto={false} imagem={slide1}/>
//     },
//     {
//       titulo: 'Academic',
//       //img: slide2,
//       img:null,
//       cont:<DivImagem texto={false} imagem={slide2}/>
//     },
//     {
//       titulo: 'Community',
//       //img: slide3,
//       img:null,
//       cont:<DivImagem texto={false} imagem={slide3}/>
//     },
//     {
//       titulo: 'Wellness',
//       img:null,
//       //img: slide4,
//       cont:<DivImagem texto={false} imagem={slide4}/>
//     },
//     {
//       titulo: 'Wellness',
//       img: null,
//       cont:<DivImagem texto={true} imagem={slide5}/>
//     },
//   ]

  return (
    <>
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay,Pagination, Navigation]}
        className="mySwiper"
      >
        {lista.map((item, index) => (
            <SwiperSlide  style={{backgroundColor:'white !important',textAlign:'center'}}>
            {/* <div class="card" style={{margin:'auto',width: '18rem'}}> */}
            {/* {
              item.img != null ? (<img src={item.img} alt="Innovation Hub" class="img-fluid" loading="lazy"/>) : (item.cont)
              style={{width:'60%'}}
            } */}
                <img src={item.imagem}  alt="Innovation Hub" class="img_swiper img-fluid" loading="lazy"/>
            </SwiperSlide>
         ))}
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide> */}
      </Swiper>
    </>
  );
}
