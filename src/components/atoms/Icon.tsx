import React, { memo } from 'react';
import { Image, ImageProps, ImageStyle } from 'react-native';

export interface IconProps extends ImageProps {
  width?: number;
  height?: number;
  style?: ImageStyle;
}

const Icon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  style,
  ...props
}) => {
  return (
    <Image
      style={{ width, height, ...style }}
      resizeMode={'contain'}
      {...props}
    />
  );
};

export default memo(Icon);
