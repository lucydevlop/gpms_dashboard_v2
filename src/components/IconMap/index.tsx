import React from 'react';
import {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  CheckOutlined,
  MailOutlined,
  GithubOutlined,
  LinkedinOutlined,
  ArrowRightOutlined,
  EditOutlined
} from '@ant-design/icons';

/**
 * Dynamic antd icons mapper
 * https://ant.design/components/icon/
 */

interface IconProps {
  icon?: string;
  options?: any;
}

export default function IconMapComponent(props: IconProps) {
  const icons = {
    QuestionCircleOutlined: <QuestionCircleOutlined {...props.options} />,
    HomeOutlined: <HomeOutlined {...props.options} />,
    SettingFilled: <SettingFilled {...props.options} />,
    SmileOutlined: <SmileOutlined {...props.options} />,
    SyncOutlined: <SyncOutlined {...props.options} />,
    LoadingOutlined: <LoadingOutlined {...props.options} />,
    PhoneOutlined: <PhoneOutlined {...props.options} />,
    UserOutlined: <UserOutlined {...props.options} />,
    CheckOutlined: <CheckOutlined {...props.options} />,
    MailOutlined: <MailOutlined />,
    GithubOutlined: <GithubOutlined />,
    LinkedinOutlined: <LinkedinOutlined />,
    ArrowRightOutlined: <ArrowRightOutlined />,
    EditOutlined: <EditOutlined />
  };
  // Default icon : QuestionCircleOutlined
  // @ts-ignore
  return icons[props.icon] || icons.QuestionCircleOutlined;
}

export {
  HomeOutlined,
  SettingFilled,
  SmileOutlined,
  SyncOutlined,
  LoadingOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  CheckOutlined,
  MailOutlined,
  GithubOutlined,
  LinkedinOutlined,
  ArrowRightOutlined,
  EditOutlined
};
