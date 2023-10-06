import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

export const Styled_Slide = styled(Slider)`
  .slick-list {
    width: 700px;
    height: 200px;
    margin-left: 20px;
    background-color: #f0f9ff;
  }
  .slick-track {
    background-color: red;
    height: 100%;
  }
  .slick-slide {
    background-color: blue;
    height: 80%;
    width: "80%";
  }
  .slick-prev:before,
  .slick-next:before {
    //얘는 양옆 버튼. 커스텀 해줘야 보임
    font-family: "slick";
    font-size: 40px;
    line-height: 1;
    opacity: 0.75;
    color: #000000;
    -webkit-font-smoothing: antialiased;
  }
`;

const Slick = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000, // 넘어가는 속도
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "-3px",
  };

  return (
    <Styled_Slide {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
    </Styled_Slide>
  );
};

export default Slick;
