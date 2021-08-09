import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import './loading.less';

/**
 * loading组件
 * @param {spinning} 是否启用
 * @param {fixed} 是否fixed覆盖全局
 * @param {text} 自定义文本
 * @param {style} 自定义样式
 * @param {Collapsed} 是否应用框架折叠样式
 * @param {content} loading内容替换
 * @param {parentRelative} 基于父级定位 top 50%
 */

interface LoadingProps {
  spinning: boolean;
  fixed?: boolean;
  text?: string | number | React.ReactNode;
  style?: React.CSSProperties;
  collapsed?: boolean;
  content?: React.ReactNode;
  parentRelative?: boolean;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { spinning, content, fixed, collapsed, style, text, parentRelative } = props;

  const CycleLoading = <div id="RCS-loading-content-circle" />;

  const AngleLoading = (
    <div id="RCS-loading-content-angle">
      <span className="angle-border border-1" />
      <span className="angle-border border-2" />
      <span className="angle-border border-3" />
      <div className="angle-content">
        <div className="angle-content-bg" />
      </div>
    </div>
  );

  const BarLoading = (
    <div id="RCS-loading-content-bar">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );

  return (
    <div
      className={classNames(
        'RCS-loading',
        !spinning && 'RCS-loading-hide',
        fixed && 'RCS-loading-fixed',
        collapsed && 'RCS-loading-collapsed'
      )}
      style={style}
    >
      <div className={classNames('RCS-loading-content', parentRelative && 'parent-relative')}>
        {content || BarLoading}
        <p className="RCS-loading-content-text">{text || 'LOADING...'}</p>
      </div>
    </div>
  );
};

export default observer(Loading);
