import React from 'react';
import { observer, inject } from 'mobx-react';
import { localeStore } from '@store/localeStore';

interface FormatterProps {
  id: string;
  defaultMessage?: React.ReactNode;
  propStyle?: React.CSSProperties;
  className?: string;
}

@inject('localeStore')
@observer
class FormatterLocale extends React.Component<FormatterProps, any> {
  render() {
    return (
      <span style={this.props.propStyle} className={this.props.className}>
        {localeStore.localeObj[this.props.id] || this.props.defaultMessage}
      </span>
    );
  }
}

export default FormatterLocale;
