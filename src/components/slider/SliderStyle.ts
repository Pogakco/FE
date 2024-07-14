import styled from "styled-components";

interface SliderWrapperProps {
  $currentSlide: number;
}

export const SliderWrapper = styled.div<SliderWrapperProps>`
  position: relative;
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
    height: 300px;
    background-color: ${({ theme, $currentSlide }) =>
      $currentSlide % 2 === 0 ? theme.color.purewhite : theme.color.pink4};
    color: ${({ theme, $currentSlide }) =>
      $currentSlide % 2 === 0 ? theme.color.black : theme.color.purewhite};
    transition: all 1s;
    position: relative;
  }
  .sliderContent {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-prev:before,
  .slick-next:before {
    position: absolute;
    top: -20px;
    left: 0;
    transition: all 1s;
    width: 60px;
    height: 60px;
    font-size: 60px;
    color: ${({ theme, $currentSlide }) =>
      $currentSlide % 2 === 0 ? theme.color.grey2 : theme.color.white};
    opacity: 0.3;
  }

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
