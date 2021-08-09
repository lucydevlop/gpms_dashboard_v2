import React, { useCallback } from 'react';
import { Card } from 'antd';
import { ISwiperProps } from '@components/ HorizontalSwiper/index';
import { conversionDate, conversionDateTime } from '@utils/conversion';

interface IHorizontalSwiperSlideProps {
  item: ISwiperProps;
  handleClick: (e: any) => void;
}
class HorizontalSwiperSlide extends React.Component<IHorizontalSwiperSlideProps, any> {
  handleCardClick() {
    this.props.handleClick(this.props.item);
  }
  render() {
    return (
      <Card
        hoverable
        style={{ borderRadius: '4px', borderColor: 'var(--primary-darken)' }}
        headStyle={{ padding: '0 10px', textAlign: 'center' }}
        title={
          <>
            <p style={{ fontSize: '15px', fontWeight: 600 }}>{this.props.item.title}</p>
            <p style={{ fontSize: '10px' }}>
              {conversionDateTime(this.props.item.object.create_dt, '{y}-{m}-{d} {h}:{i}') || '--'}
            </p>
          </>
        }
        onClick={() => this.handleCardClick()}
        bodyStyle={{ padding: '24px 0', textAlign: 'center' }}
      >
        {this.props.item.body}
      </Card>
    );
  }
}
export default HorizontalSwiperSlide;
