// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

function SwiperComp({ iterableData }) {
  return (
    <Swiper
      slidesPerView={4}
      modules={[Pagination]}
      spaceBetween={15}
      breakpoints={{
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          /* spaceBetween: 20, */
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 3,
          /* spaceBetween: 30, */
        },
        600:{
          slidesPerView: 4,
        },
        // when window width is >= 640px
        770: {
          slidesPerView: 5,
          /* spaceBetween: 40, */
        },
      }}
    >
      {iterableData.map((data, index) => (
        <SwiperSlide key={index}>{data}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SwiperComp;
