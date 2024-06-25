import React from 'react';
import styled, { keyframes, css } from 'styled-components';

interface ImageContainerProps {
  active: boolean;
}

interface CarouselImagesProps {
  data: {
    carouselImages: {
      activeImage: string;
      inactiveImage1: string;
      inactiveImage2: string;
    };
  }[];
  activeIndex: number;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 518px; /* Set maximum width */
`;

const ImageContainer = styled.div<ImageContainerProps>`
  display: ${(props) => (props.active ? 'grid' : 'none')};
  position: relative;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px; /* Add gap between images */
  height: 530px; /* Set maximum height */
  max-width: 518px; /* Set maximum width */
  animation: ${(props) =>
    props.active
      ? css`
          ${fadeIn} 0.5s forwards
        `
      : css`
          ${fadeOut} 0.5s forwards
        `};
`;

const ActiveImage = styled.img`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  justify-self: center;
  align-self: center;
  width: 100%;
  max-width: 28rem;
  height: 100%;
  object-fit: scale-down;
  z-index: 2;
`;

const InactiveImage = styled.img`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  justify-self: center;
  align-self: start;
  width: 100%;
  max-width: 28rem;
  height: 100%;
  object-fit: scale-down;
  opacity: 0.3;
  z-index: 0;
`;

const InactiveImage2 = styled.img`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  justify-self: center;
  align-self: end;
  position: sticky;
  bottom: 0;
  width: 100%;
  max-width: 28rem;
  height: 100%;
  object-fit: scale-down;
  opacity: 0.3;
  z-index: 1;
`;

const CarouselImages: React.FC<CarouselImagesProps> = ({
  data,
  activeIndex,
}) => {
  return (
    <ImagesWrapper>
      {data.map((item, index) => (
        <ImageContainer key={index} active={index === activeIndex}>
          <ActiveImage src={item.carouselImages.activeImage} />
          <InactiveImage src={item.carouselImages.inactiveImage1} />
          <InactiveImage2 src={item.carouselImages.inactiveImage2} />
        </ImageContainer>
      ))}
    </ImagesWrapper>
  );
};

export default CarouselImages;
