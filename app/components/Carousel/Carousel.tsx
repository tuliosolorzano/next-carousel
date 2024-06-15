'use client';

import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { ButtonLink } from '@/app/components-ui';
import { IconChevronRight } from '@/app/components-icons';
import { CarouselData } from '@/app/data';

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
  height: 100%;
  max-height: 530px; /* Set maximum height */
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
  /* display: flex;
  flex-direction: column;
  flex: 1; */
  padding: 0;
  margin-top: 10.4rem;
  margin-right: 3rem;
  /* gap: 3rem; */
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

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [transitioning, setTransitioning] = useState(true);
  const timerRef = useRef<number | undefined>();

  const totalImages = CarouselData.length;

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
        {CarouselData.map((item, index) => (
          <CarouselItem key={index} active={index === activeIndex}>
            <CarouselContent>
              <div className='flex-column gap-3 mar-30-b'>
                <CarouselTitle>{item.carouselTitle}</CarouselTitle>
                <CarouselHeading>{item.carouselHeading}</CarouselHeading>
                <CarouselText>{item.carouselText}</CarouselText>
              </div>
              <ButtonLink
                className='button primary small'
                to={item.ctaInfo.ctaUrl}
                target={
                  item.ctaInfo.ctaTarget ? item.ctaInfo.ctaTarget : '_parent'
                }
              >
                {item.ctaInfo.ctaText ? item.ctaInfo.ctaText : 'Learn More'}
                <IconChevronRight />
              </ButtonLink>
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
        {CarouselData.map((_, index) => (
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
