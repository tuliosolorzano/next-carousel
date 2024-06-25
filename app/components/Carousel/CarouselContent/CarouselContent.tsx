import React from 'react';
import styled from 'styled-components';
import { ButtonLink } from '@/app/components-ui';
import { IconChevronRight } from '@/app/components-icons';

const CarouselContentWrapper = styled.div`
  flex-direction: column;
  flex: 1;
  padding: 0;
  margin-top: 10.4rem;
  margin-right: 3rem;
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

interface CarouselContentProps {
  title: string;
  heading: string;
  text: string;
  ctaText: string;
  ctaLink: string;
}

const CarouselContent: React.FC<CarouselContentProps> = ({
  title,
  heading,
  text,
  ctaText,
  ctaLink,
}) => {
  return (
    <CarouselContentWrapper>
      <div className='flex-column gap-3 mar-30-b'>
        <CarouselTitle>{title}</CarouselTitle>
        <CarouselHeading>{heading}</CarouselHeading>
        <CarouselText>{text}</CarouselText>
      </div>
      <ButtonLink
        className='button primary small icon-link'
        to={ctaLink}
        target='_patent'
      >
        {ctaText} <IconChevronRight />
      </ButtonLink>
    </CarouselContentWrapper>
  );
};

export default CarouselContent;
