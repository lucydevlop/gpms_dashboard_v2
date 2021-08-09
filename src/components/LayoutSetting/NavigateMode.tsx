import React from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import LayoutStore from '@/store/layoutStore';
import { observer, inject } from 'mobx-react';
import LocaleStore from '@store/localeStore';

const NavigateMode: React.FC = (props) => {
  const {
    layoutStore: { isHorizontalNavigator, isInlineLayout, changeLayoutStatus },
    localeStore: { localeObj }
  } = props as { layoutStore: LayoutStore; localeStore: LocaleStore };
  return (
    <>
      <div className={classNames('RCS-setting-Row', 'RCS-setting-haveSelectedIcon')}>
        <div className="RCS-setting-title">
          {localeObj['layoutSetting.navMode'] || 'Navigation mode'}
        </div>
        <Tooltip placement="top" title={localeObj['layoutSetting.verticalNav'] || 'Left 모드'}>
          <img
            onClick={() => changeLayoutStatus('navigateMode', 'vertical')}
            src={require('@assets/images/setting/vertical.svg').default}
            alt=""
          />
        </Tooltip>
        <Tooltip placement="top" title={localeObj['layoutSetting.horizontalNav'] || 'Top 모드'}>
          <img
            onClick={() => changeLayoutStatus('navigateMode', 'horizontal')}
            src={require('@assets/images/setting/horizontal.svg').default}
            alt=""
          />
        </Tooltip>
        <CheckOutlined
          className={classNames(
            'RCS-setting-selectedIcon',
            isHorizontalNavigator && 'RCS-setting-selectedIcon-rightPlace'
          )}
        />
      </div>
      <div
        className={classNames(
          'RCS-setting-Row',
          'RCS-setting-layoutMode',
          'RCS-setting-haveSelectedIcon',
          isHorizontalNavigator && 'RCS-setting-layoutMode-disabled'
        )}
      >
        <div className="RCS-setting-title">
          {localeObj['layoutSetting.layoutMode'] || '레이아웃'}
        </div>
        <Tooltip
          placement="top"
          title={
            isHorizontalNavigator
              ? localeObj['layoutSetting.verticalNavOnly'] || '왼쪽 Navigation 동작'
              : localeObj['layoutSetting.splitMode'] || '화면 분할'
          }
        >
          <img
            onClick={() => (isHorizontalNavigator ? {} : changeLayoutStatus('layoutMode', 'split'))}
            src={require('@assets/images/setting/split.svg').default}
            alt=""
          />
        </Tooltip>
        <Tooltip
          placement="top"
          title={
            isHorizontalNavigator
              ? localeObj['layoutSetting.verticalNavOnly'] || '왼쪽 Navigation 동작'
              : localeObj['layoutSetting.inlineMode'] || 'One piece'
          }
        >
          <img
            onClick={() =>
              isHorizontalNavigator ? {} : changeLayoutStatus('layoutMode', 'inline')
            }
            src={require('@assets/images/setting/inline.svg').default}
            alt=""
          />
        </Tooltip>
        {!isHorizontalNavigator && (
          <CheckOutlined
            className={classNames(
              'RCS-setting-selectedIcon',
              isInlineLayout && 'RCS-setting-selectedIcon-rightPlace'
            )}
          />
        )}
      </div>
    </>
  );
};

export default inject('layoutStore', 'localeStore')(observer(NavigateMode));
