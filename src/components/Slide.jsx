// src/components/SliderBanner.js
import React from "react";
import Slider from "react-slick";
import "../styles/Slide.css";

import welcomebanner from "../assets/welcomebanner.png";
import studybanner from "../assets/studybanner.png";

const Slide = () => {
  const settings = {
    dots: true, // 페이지 네비게이션 점
    infinite: true, // 무한 슬라이드
    speed: 500, // 슬라이드 속도
    slidesToShow: 1, // 한 화면에 보여줄 슬라이드 개수
    slidesToScroll: 1, // 한번에 넘길 슬라이드 개수
    autoplay: true, // 자동 슬라이드
    autoplaySpeed: 3000, // 자동 슬라이드 속도 (3초)
    draggable: true, // 드래그 가능
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slider-item">
          <img src={studybanner} alt="Banner 3" />
        </div>
        <div className="slider-item">
          <img src={welcomebanner} alt="Banner 2" />
        </div>
        <div className="slider-item">
          <img
            src="https://file.f-lab.kr/blog/0a6704ca-ad5e-43a5-a26c-0fd30eae2326-pvTb3C1HXw01JbHe.jpg"
            alt="Banner 1"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Slide;
