import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import HorizontalSwiperSlide from '@components/ HorizontalSwiper/HorizontalSwiperSlide';
import './horizontalSwiper.less';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';
import { ISwiperProps } from '@components/ HorizontalSwiper/index';

interface IHorizontalSwiperRowProps {
  items: ISwiperProps[];
  handleClick: (e: any) => void;
}
class HorizontalSwiperRow extends React.Component<IHorizontalSwiperRowProps, any> {
  render() {
    // const [swiperRef, setSwiperRef] = useState(null);

    return (
      <HorizontalContainer
        // onSwiper={setSwiperRef}
        slidesPerView={7}
        spaceBetween={30}
        navigation={true}
      >
        {this.props.items.map((item) => (
          <SwiperSlide key={`slide-${item.id}`} className="RCS-Swiper-Row">
            <HorizontalSwiperSlide item={item} handleClick={(e) => this.props.handleClick(e)} />
          </SwiperSlide>
        ))}
      </HorizontalContainer>
    );
  }
}

const HorizontalContainer = styled(Swiper)`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  justify-content: flex-start;
  width: auto;
  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    right: 0;
  }
`;
export default HorizontalSwiperRow;
