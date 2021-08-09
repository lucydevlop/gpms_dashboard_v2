import React from 'react';
import './horizontalSwiper.less';
import HorizontalSwiperRow from '@components/ HorizontalSwiper/HorizontalSwiperRow';
import classNames from 'classnames';
import { layoutStore } from '@store/layoutStore';
import { inject, observer } from 'mobx-react';

interface IHorizontalSwiperProps {
  title: string;
  items: ISwiperProps[];
  handleClick: (e: any) => void;
}

export interface ISwiperProps {
  id: number;
  title: string | undefined;
  body: any | undefined;
  object: any;
}

@inject('layoutStore')
@observer
class HorizontalSwiper extends React.Component<IHorizontalSwiperProps, any> {
  handleClick(e: any) {
    this.props.handleClick(e);
  }

  render() {
    const {
      isInlineLayout,
      isDarkTheme,
      layoutStatus: { collapsed, isMobile, showSiderBar, fixHeader }
    } = layoutStore;
    return (
      <div className={classNames('RCS-SwiperWapper', isDarkTheme && 'RCS-SwiperWapper-darkTheme')}>
        <p>
          {this.props.title}({this.props.items.length}건)
        </p>
        {this.props.items.length === 0 ? (
          <div className="RCS-Swiper-NoItem">
            {/*<Chat />*/}
            <p>등록된 정보가 없습니다</p>
          </div>
        ) : (
          <HorizontalSwiperRow
            items={this.props.items}
            handleClick={(e: any) => this.handleClick(e)}
          />
        )}
      </div>
    );
  }
}
export default HorizontalSwiper;
