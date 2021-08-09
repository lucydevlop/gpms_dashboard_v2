import React from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import FormatterLocale from '@components/FormatterLocale';
import './exception.less';

interface ExceptionProps {
  errorCode: React.ReactNode;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  propStyle?: React.CSSProperties;
}

class Exception extends React.Component<ExceptionProps, any> {
  handleGoHome() {
    const history = useHistory();
    history.push('/dashboard');
  }
  render() {
    return (
      <div className="RCS-exception" style={this.props.propStyle}>
        <h1>{this.props.errorCode}</h1>
        <p>{this.props.title}</p>
        <div>
          <span>{this.props.subTitle || <FormatterLocale id="exception.backHome" />}</span>
          <Button type="primary" onClick={this.handleGoHome}>
            <FormatterLocale id="button.backHome" />
          </Button>
        </div>
      </div>
    );
  }
}
// const Exception: React.FC<ExceptionProps> = (props) => {
//   const history = useHistory();
//   const handleGoHome = () => {
//     history.push('/dashboard');
//   };
//
//   const { errorCode, title, subTitle, propStyle } = props;
//   return (
//     <div className="RCS-exception" style={propStyle}>
//       <h1>{errorCode}</h1>
//       <p>{title}</p>
//       <div>
//         <span>{subTitle || <FormatterLocale id="exception.backHome" />}</span>
//         <Button type="primary" onClick={handleGoHome}>
//           <FormatterLocale id="button.backHome" />
//         </Button>
//       </div>
//     </div>
//   );
// };

export default Exception;
