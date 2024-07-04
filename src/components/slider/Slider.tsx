import React, { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import sliderImg1 from "../../assets/imgs/sliderImg1.svg";
import sliderImg2 from "../../assets/imgs/sliderImg2.svg";
import sliderImg3 from "../../assets/imgs/sliderImg3.svg";
import sliderImg4 from "../../assets/imgs/sliderImg4.svg";

// 슬라이더 콘텐츠 타입 정의
interface SliderContent {
  id: number;
  img: string;
  text: string;
  pointText: string;
}

const sliderContents: SliderContent[] = [
  { id: 1, img: sliderImg1, text: "혼자 공부하면 너무 심심하잖아요", pointText: "이제는 뽀각코 해요" },
  { id: 2, img: sliderImg2, text: "오늘은 반드시 마음먹은만큼!", pointText: "서로 타이머를 공유해요" },
  { id: 3, img: sliderImg3, text: "열심히 뽀모도로 포인트를 채워서", pointText: "뽀마왕이 되어봐요" },
  { id: 4, img: sliderImg4, text: "남들 놀 때 뽀각코한다면", pointText: "취업걱정은 끄떡없을거에요" },
];

const MainSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (newIndex: number) => setCurrentSlide(newIndex),
  };

  return (
    <SliderWrapper currentSlide={currentSlide}>
      <Slider {...settings}>
        {sliderContents.map((slide) => (
          <div className="sliderContent" key={slide.id}>
            <div className="sliderBox">
              <div className="sliderText">
                <h2>{slide.text}</h2>
                <h1>{slide.pointText}</h1>
              </div>
              <img src={slide.img} alt={`slide-${slide.id}`} />
            </div>
          </div>
        ))}
      </Slider>
    </SliderWrapper>
  );
};

interface SliderWrapperProps {
  currentSlide: number;
}

const SliderWrapper = styled.div<SliderWrapperProps>`
  position: relative;
  padding-top: 60px;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.grey1};

  button {

    font-size: 30px;
    z-index: 100;
    margin: 0px 100px 0px 100px;
  }

  

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 320px;
    background-color: ${({ theme, currentSlide }) =>
      currentSlide % 2 === 0 ? theme.color.purewhite : theme.color.pink4};
    color: ${({ theme, currentSlide }) =>
      currentSlide % 2 === 0 ? theme.color.black : theme.color.purewhite};
    transition: all 1s;
  }

  .sliderContent {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-prev:before, .slick-next:before  {
    transition: all 1s;
    width: 50px;
    height: 50px;
    font-size: 30px;
    color: ${({ theme, currentSlide }) =>
      currentSlide % 2 === 0 ? theme.color.black : theme.color.purewhite};  }

  .sliderBox {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    img {
      width: 335px;
      height: 200px;
    }
    .sliderText {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: end;
      height: 100%;
      margin-right: 100px;

      h1 {
        font-size: ${({ theme }) => theme.fontSize.title};
        font-weight: 1000;
        line-height: 30px;
      }
      h2 {
        font-size: ${({ theme }) => theme.fontSize.large};
      }
    }
  }

  .slick-dots li button:before {
    color: ${({ theme }) => theme.color.grey1};
  }
`;

export default MainSlider;
