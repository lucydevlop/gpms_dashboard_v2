import React, { PureComponent } from 'react';
import styled from 'styled-components';

interface State {
  src: string | null | undefined;
  src2x: string | null | undefined;
}

const ImageWrapper = styled.figure`
  position: relative;
  overflow: hidden;
  top: 0;
  left: 0;
  margin: 0;
  width: 100%;
  height: ${(props: Props) => (props.fillOut ? '100%' : 'initial')};
  &:before {
    content: '';
    display: block;
    padding-bottom: ${(props: Props) => {
      if (props.fillOut) {
        return 0;
      }
      return props.ratio ? `${100 / props.ratio}%` : '100%';
    }};
  }
  ${(props: Props) => {
    if (props.hover) {
      return `
                &:hover {
                    > img {
                        transform: scale(1.05);
                    }
                }
            `;
    }
    return '';
  }};
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  background-color: grey;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
`;

type Props = {
  src?: string | null;
  src2x?: string | null;
  defaultSrc?: string | null;
  defaultSrc2x?: string | null;
  alt?: string;
  ratio?: number;
  fillOut?: boolean;
  contain?: boolean;
  hover?: boolean;
  preload?: boolean;
  onLoad?: Function;
  onError?: Function;
  pageLoadingItemLoading?: Function;
  pageLoadingItemLoaded?: Function;
};

class Image extends PureComponent<Props, State> {
  image: HTMLImageElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      src: props.src,
      src2x: props.src2x
    };

    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
  }

  componentDidMount() {
    this.setState({ src: this.props.src, src2x: this.props.src2x });
    if (this.image && this.image.complete) {
      this.onLoad();
    }
  }

  UNSAFE_componentWillMount() {
    this.setState({ src: this.props.src, src2x: this.props.src2x });
  }

  UNSAFE_componentWillReceiveProps(props: Props) {
    if (props.src !== this.props.src) {
      this.setState({ src: this.props.src, src2x: this.props.src2x });
    }
  }

  onLoad() {
    const { onLoad } = this.props;
    // this.image.style.opacity = '1';
    if (onLoad) {
      onLoad();
    }
  }

  onError() {
    const { onError, defaultSrc, defaultSrc2x } = this.props;
    this.setState({
      src: defaultSrc,
      src2x: defaultSrc2x || defaultSrc
    });
    if (onError) {
      onError();
    }
  }

  render() {
    const { ratio, fillOut, alt, contain, hover } = this.props;
    const { src, src2x } = this.state;
    return (
      <ImageWrapper ratio={ratio} fillOut={fillOut} hover={hover}>
        <Img
          // @ts-ignore
          contain={contain}
          onLoad={this.onLoad}
          onError={this.onError}
          // @ts-ignore
          innerRef={(image) => (this.image = image)}
          srcSet={`${src} 1x, ${src2x || src} 2x`}
          alt={alt}
        />
      </ImageWrapper>
    );
  }
}

export default Image;
