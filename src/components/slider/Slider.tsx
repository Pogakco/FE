import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import sliderImg1 from "../../assets/imgs/sliderImg1.svg";
import sliderImg2 from "../../assets/imgs/sliderImg2.svg";
import sliderImg3 from "../../assets/imgs/sliderImg3.svg";
import sliderImg4 from "../../assets/imgs/sliderImg4.svg";
import { SliderWrapper } from "./SliderStyle";

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
  { id: 3, img: sliderImg3, text: "열심히 뽀모도로 포인트를 채워서", pointText: "뽀마왕이 돼봐요!" },
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
    beforeChange: (_oldIndex : number, newIndex: number) => setCurrentSlide(newIndex),
  };

  return (
    <SliderWrapper $currentSlide={currentSlide}>
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



export default MainSlider;
