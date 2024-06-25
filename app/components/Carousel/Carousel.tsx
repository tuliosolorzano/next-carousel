'use client';

import { useState, useEffect, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { CarouselData, CarouselCopyData } from '@/app/data';
import { CarouselContent } from '@/app/components/Carousel/CarouselContent';
import { ControlsContainer } from '@/app/components/Carousel/ControlsContainer';
import { CarouselImages } from '@/app/components/Carousel/CarouselImages';

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  margin: 15.8rem auto; /* Center the carousel and set top and bottom margins */
  min-height: 530px; /* Set maximum height */
`;

const CarouselInner = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: calc(100% - 460px); /* Default width */
  height: 100%;
  min-height: 530px; /* Set maximum height */
  @media (max-width: 768px) {
    width: calc(100% - 20px); /* Adjust width for small devices */
  }
`;

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
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

  const CarouselCopy = CarouselCopyData[0];
  const Title = CarouselCopy.carouselTitle;
  const Heading = CarouselCopy.carouselHeading;
  const Copy = CarouselCopy.carouselText;
  const CTACopy = CarouselCopy.ctaInfo.ctaText;
  const CTAUrl = CarouselCopy.ctaInfo.ctaUrl;
  const CTATarget = CarouselCopy.ctaInfo.ctaTarget;

  return (
    <CarouselContainer>
      <CarouselInner>
        <CarouselContent
          title={Title}
          heading={Heading}
          text={Copy}
          ctaText={CTACopy}
          ctaLink={CTAUrl}
          ctaTarget={CTATarget}
        />
        <CarouselImages data={CarouselData} activeIndex={activeIndex} />
      </CarouselInner>
      <ControlsContainer
        activeIndex={activeIndex}
        totalImages={totalImages}
        onIndicatorClick={handleIndicatorClick}
        isPlaying={isPlaying}
        onTogglePlayPause={togglePlayPause}
      />
    </CarouselContainer>
  );
};

export default Carousel;
