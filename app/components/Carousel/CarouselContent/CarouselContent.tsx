import React from 'react';
import { CarouselCopyData } from '@/app/data';
import { ButtonLink } from '@/app/components-ui';
import { IconChevronRight } from '@/app/components-icons';

const CarouselContent = () => {
  return (
    <div className='carousel-content'>
      <div className='flex-column gap-3 mar-30-b'>
        <h3>Lorem ipsum dolor</h3>
        <h2>Lorem ipsum dolor sit amet, est mollis evertitur ut</h2>
        <p>
          Lorem ipsum dolor sit amet, est mollis evertitur ut, clita utinam
          quaeque ad sed, an legere concludaturque eum. Duo omnis solet
          dissentiet te, ea sed quis erat reprehendunt, cetero consetetur
          philosophia mel in.
        </p>
      </div>
      <ButtonLink className='button primary small' to='/' target='_patent'>
        Learn More <IconChevronRight />
      </ButtonLink>
    </div>
  );
};

export default CarouselContent;
