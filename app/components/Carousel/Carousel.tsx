'use client';

import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface CarouselItemProps {
  active: boolean;
}

interface IndicatorProps {
  active: boolean;
}

interface ProgressBarProps {
  active: boolean;
}

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  margin: 15.8rem auto; /* Center the carousel and set top and bottom margins */
  max-height: 530px; /* Set maximum height */
`;

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

const CarouselInner = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: calc(100% - 460px); /* Default width */
  @media (max-width: 768px) {
    width: calc(100% - 20px); /* Adjust width for small devices */
  }
`;

const CarouselItem = styled.div<CarouselItemProps>`
  display: ${(props) => (props.active ? 'flex' : 'none')};
  min-width: 100%;
  animation: ${(props) =>
    props.active
      ? css`
          ${fadeIn} 0.5s forwards
        `
      : css`
          ${fadeOut} 0.5s forwards
        `};
`;

const CarouselContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
  margin-top: 10.4rem;
  gap: 1.5rem;
  max-height: 530px; /* Set maximum height */
`;

const CarouselTitle = styled.h3`
  font-weight: 600;
  font-size: 1.4rem;
  line-height: 2rem;
  color: #929a9f;
  text-transform: uppercase;
`;

const CarouselHeading = styled.h2`
  font-weight: 700;
  font-size: 3.2rem;
  line-height: 4.2rem;
  color: #263640;
`;

const CarouselText = styled.p`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.6rem;
  color: #929a9f;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 15px; /* Add gap between images */
  max-height: 530px; /* Set maximum height */
  max-width: 518px; /* Set maximum width */
`;

const ActiveImageContainer = styled.div`
  grid-row: 1 / 3; /* Span two rows */
  z-index: 2;
  height: 100%;
`;

const InactiveImageContainer = styled.div`
  z-index: 1;
  height: 100%;
`;

const ActiveImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InactiveImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.3;
`;

const ControlsContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Indicator = styled.div<IndicatorProps>`
  width: 33px;
  height: 20px;
  background: transparent;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IndicatorNumber = styled.span<IndicatorProps>`
  font-size: 12px;
  line-height: 20px;
  color: ${(props) => (props.active ? '#263640' : '#C4C4C4')};
  margin-left: 5px;
`;

const growHeight = keyframes`
  from {
    height: 3px;
  }
  to {
    height: 14px;
  }
`;

const shrinkHeight = keyframes`
  from {
    height: 14px;
  }
  to {
    height: 3px;
  }
`;

const ProgressBar = styled.div<ProgressBarProps>`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 3px;
  background: ${(props) => (props.active ? '#FF9900' : '#263640')};
  border-radius: 10px;
  opacity: ${(props) => (props.active ? '1' : '0.3')};
  animation: ${(props) =>
    props.active
      ? css`
          ${growHeight} 0.5s linear forwards
        `
      : css`
          ${shrinkHeight} 0.5s linear forwards
        `};
`;

const PlayPauseButton = styled.button`
  margin-top: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #d9d9d9;
`;

const images = [
  {
    carouselId: '01',
    carouselTitle: 'Lorem ipsum dolor 1',
    carouselHeading: 'Lorem ipsum dolor sit amet, est mollis evertitur ut 1',
    carouselText:
      'Lorem ipsum dolor sit amet, est mollis evertitur ut, clita utinam quaeque ad sed, an legere concludaturque eum. Duo omnis solet dissentiet te, ea sed quis erat reprehendunt, cetero consetetur philosophia mel in. 1',
    carouselImages: {
      activeImage: 'https://tuliosol.com/images/next-carousel/img-01.png',
      inactiveImage1: 'https://tuliosol.com/images/next-carousel/img-02.png',
      inactiveImage2: 'https://tuliosol.com/images/next-carousel/img-03.png',
    },
  },
  {
    carouselId: '02',
    carouselTitle: 'Lorem ipsum dolor 2',
    carouselHeading: 'Lorem ipsum dolor sit amet, est mollis evertitur ut 2',
    carouselText:
      'Lorem ipsum dolor sit amet, est mollis evertitur ut, clita utinam quaeque ad sed, an legere concludaturque eum. Duo omnis solet dissentiet te, ea sed quis erat reprehendunt, cetero consetetur philosophia mel in. 2',
    carouselImages: {
      activeImage: 'https://tuliosol.com/images/next-carousel/img-02.png',
      inactiveImage1: 'https://tuliosol.com/images/next-carousel/img-03.png',
      inactiveImage2: 'https://tuliosol.com/images/next-carousel/img-01.png',
    },
  },
  {
    carouselId: '03',
    carouselTitle: 'Lorem ipsum dolor 3',
    carouselHeading: 'Lorem ipsum dolor sit amet, est mollis evertitur ut 3',
    carouselText:
      'Lorem ipsum dolor sit amet, est mollis evertitur ut, clita utinam quaeque ad sed, an legere concludaturque eum. Duo omnis solet dissentiet te, ea sed quis erat reprehendunt, cetero consetetur philosophia mel in. 3',
    carouselImages: {
      activeImage: 'https://tuliosol.com/images/next-carousel/img-03.png',
      inactiveImage1: 'https://tuliosol.com/images/next-carousel/img-01.png',
      inactiveImage2: 'https://tuliosol.com/images/next-carousel/img-02.png',
    },
  },
];

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [transitioning, setTransitioning] = useState(true);
  const timerRef = useRef<number | undefined>();

  const totalImages = images.length;

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % totalImages);
      }, 4000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, totalImages]);

  const togglePlayPause = () => {
    if (isPlaying) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    } else {
      timerRef.current = window.setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % totalImages);
      }, 4000);
    }
    setIsPlaying(!isPlaying);
  };

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <CarouselContainer>
      <CarouselInner>
        {images.map((item, index) => (
          <CarouselItem key={index} active={index === activeIndex}>
            <CarouselContent>
              <CarouselTitle>{item.carouselTitle}</CarouselTitle>
              <CarouselHeading>{item.carouselHeading}</CarouselHeading>
              <CarouselText>{item.carouselText}</CarouselText>
            </CarouselContent>
            <ImageContainer>
              <ActiveImageContainer>
                <ActiveImage src={item.carouselImages.activeImage} />
              </ActiveImageContainer>
              <InactiveImageContainer>
                <InactiveImage src={item.carouselImages.inactiveImage1} />
              </InactiveImageContainer>
              <InactiveImageContainer>
                <InactiveImage src={item.carouselImages.inactiveImage2} />
              </InactiveImageContainer>
            </ImageContainer>
          </CarouselItem>
        ))}
      </CarouselInner>
      <ControlsContainer>
        {images.map((_, index) => (
          <Indicator
            key={index}
            active={index === activeIndex}
            onClick={() => handleIndicatorClick(index)}
          >
            <IndicatorNumber active={index === activeIndex}>
              {(index + 1).toString().padStart(2, '0')}
            </IndicatorNumber>
            <ProgressBar active={index === activeIndex} />
          </Indicator>
        ))}
        <PlayPauseButton onClick={togglePlayPause}>
          {isPlaying ? '❚❚' : '▶'}
        </PlayPauseButton>
      </ControlsContainer>
    </CarouselContainer>
  );
};

export default Carousel;
