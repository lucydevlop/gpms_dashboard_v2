import React from 'react';
import classNames from 'classnames';
import { Tooltip, Select, Switch } from 'antd';
import LayoutStore from '@/store/layoutStore';
import { observer, inject } from 'mobx-react';
import LocaleStore from '@store/localeStore';

const ContentChange: React.FC = (props) => {
  const {
    layoutStore: {
      isHorizontalNavigator,
      isInlineLayout,
      changeLayoutStatus,
      layoutStatus: { showSiderBar, showHeader, fixSiderBar, fixHeader, contentAreaWidthMode }
    },
    localeStore: { localeObj }
  } = props as { layoutStore: LayoutStore; localeStore: LocaleStore };

  const ContentBlock = (
    <div className={classNames('RCS-setting-Row', 'RCS-setting-contentControl')}>
      <div className="RCS-setting-settingItem">
        <div className="RCS-setting-settingItem-Label">
          {localeObj['layoutSetting.contentWidth'] || 'Content area width'}
        </div>
        <Select
          className="RCS-setting-settingAction"
          value={contentAreaWidthMode}
          style={{ width: 120 }}
          size="small"
          onChange={(val) =>
            changeLayoutStatus('contentAreaWidthMode', val as 'flow' | 'max-width')
          }
        >
          <Select.Option value="flow">
            {localeObj['layoutSetting.flowContent'] || 'streaming'}
          </Select.Option>
          <Select.Option value="max-width" disabled={!isHorizontalNavigator}>
            {localeObj['layoutSetting.maxWidth'] || 'Fixed width'}
          </Select.Option>
        </Select>
      </div>
      <Tooltip
        placement="left"
        title={
          isInlineLayout
            ? localeObj['layoutSetting.splitModeOnly'] || 'Only works in a column layout'
            : ''
        }
      >
        <div className="RCS-setting-settingItem">
          <div className="RCS-setting-settingItem-Label">
            {localeObj['layoutSetting.fixHeader'] || 'Fixed the Header'}
          </div>
          <Switch
            disabled={isInlineLayout}
            checked={fixHeader}
            defaultChecked
            onChange={(val) => changeLayoutStatus('fixHeader', val)}
          />
        </div>
      </Tooltip>
      <Tooltip
        placement="left"
        title={
          isHorizontalNavigator
            ? localeObj['layoutSetting.verticalNavOnly'] || 'Only works in left navigation mode'
            : ''
        }
      >
        <div className="RCS-setting-settingItem">
          <div className="RCS-setting-settingItem-Label">
            {localeObj['layoutSetting.fixSiderBar'] || 'Fixed side menu'}
          </div>
          <Switch
            disabled={isHorizontalNavigator}
            checked={fixSiderBar}
            defaultChecked
            onChange={(val) => changeLayoutStatus('fixSiderBar', val)}
          />
        </div>
      </Tooltip>
    </div>
  );

  const DisplayBlock = (
    <div
      className={classNames('RCS-setting-Row', 'RCS-setting-layoutControl')}
      style={{ marginBottom: 0 }}
    >
      <div className="RCS-setting-title">
        {localeObj['layoutSetting.contentSetting'] || 'Content control'}
      </div>
      <div className="RCS-setting-settingItem">
        <div className="RCS-setting-settingItem-Label">
          {localeObj['layoutSetting.showHeader'] || 'According to the header'}
        </div>
        <Switch
          checked={showHeader}
          defaultChecked
          onChange={(val) => changeLayoutStatus('showHeader', val)}
        />
      </div>
      <Tooltip
        placement="left"
        title={
          isHorizontalNavigator
            ? localeObj['layoutSetting.verticalNavOnly'] || 'Only works in left navigation mode'
            : ''
        }
      >
        <div className="RCS-setting-settingItem">
          <div className="RCS-setting-settingItem-Label">
            {localeObj['layoutSetting.showSiderBar'] || 'Displays the side menu'}
          </div>
          <Switch
            disabled={isHorizontalNavigator}
            checked={showSiderBar}
            defaultChecked
            onChange={(val) => changeLayoutStatus('showSiderBar', val)}
          />
        </div>
      </Tooltip>
    </div>
  );

  return (
    <>
      {DisplayBlock}
      {ContentBlock}
    </>
  );
};

export default inject('layoutStore', 'localeStore')(observer(ContentChange));
