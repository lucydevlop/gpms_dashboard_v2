import React from 'react';
import styled from 'styled-components';

export const IMAGE_SIZES = {
  THUMBNAIL: 'thumbnail',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large'
};

const Img = styled.img`
  width: 100%;
`;

type Props = {
  className?: string;
  size?: string;
  style?: any;
  url: string;
};

export const ImageWrapper = ({ size = IMAGE_SIZES.MEDIUM, style, url, className }: Props) => (
  <div className={className} style={style}>
    <Img src={url} alt="" />
  </div>
);
