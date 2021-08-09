import React from 'react';
import classNames from 'classnames';
import { CheckOutlined } from '@ant-design/icons';
import { themeColors } from '@config/setting';
import { message, Tooltip } from 'antd';
import LayoutStore from '@/store/layoutStore';
import { observer, inject } from 'mobx-react';
import LocaleStore from '@store/localeStore';

const ThemeChange: React.FC = (props) => {
  const {
    layoutStore: {
      isDarkTheme,
      changeLayoutStatus,
      layoutStatus: { currentColor }
    },
    localeStore: { localeObj }
  } = props as { layoutStore: LayoutStore; localeStore: LocaleStore };

  const handleChangeTheme = (color: string) => {
    changeLayoutStatus('currentColor', color);
    message.loading(localeObj['layoutSetting.changeCurrentColor'] || '색상 적용', 1.4);
  };

  const handleChangeVision = (theme: 'light' | 'dark') => {
    changeLayoutStatus('visionTheme', theme);
    message.loading(localeObj['layoutSetting.changeCurrentTheme'] || '테마 적용', 1.4);
  };

  return (
    <>
      <div className={classNames('RCS-setting-Row', 'RCS-setting-haveSelectedIcon')}>
        <div className="RCS-setting-title">
          {localeObj['layoutSetting.visionTheme'] || '테마 설정'}
        </div>
        <Tooltip placement="top" title={localeObj['layoutSetting.lightTheme'] || '밝은모드'}>
          <img
            src={require('@assets/images/setting/light.svg').default}
            alt=""
            onClick={() => handleChangeVision('light')}
          />
        </Tooltip>
        <Tooltip placement="top" title={localeObj['layoutSetting.darkTheme'] || '다크모드'}>
          <img
            src={require('@assets/images/setting/dark.svg').default}
            alt=""
            onClick={() => handleChangeVision('dark')}
          />
        </Tooltip>
        <CheckOutlined
          className={classNames(
            'RCS-setting-selectedIcon',
            isDarkTheme && 'RCS-setting-selectedIcon-rightPlace'
          )}
        />
      </div>
      <div className={classNames('RCS-setting-Row', 'RCS-setting-themeChange')}>
        <div className="RCS-setting-title">
          {localeObj['layoutSetting.colorStyle'] || '색상 스타일'}
        </div>
        {themeColors?.map((c) => (
          <div
            key={c}
            style={{ backgroundColor: c }}
            className="RCS-setting-themeChange-colorBlock"
            onClick={() => handleChangeTheme(c)}
          >
            {currentColor === c && <CheckOutlined />}
          </div>
        ))}
      </div>
    </>
  );
};

export default inject('layoutStore', 'localeStore')(observer(ThemeChange));
