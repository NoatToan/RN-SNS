import React, { memo } from 'react';
import {
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Image,
} from 'react-native';
interface ServiceButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  titleStyles?: StyleProp<TextStyle>;
  icon?: ImageSourcePropType;
  onClick?: () => void;
}

const ServiceButton: React.FC<ServiceButtonProps> = ({
  title,
  icon,
  containerStyle,
  titleStyles,
  onClick,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onClick}
    >
      <View style={{ width: '20%', paddingLeft: 15 }}>
        {!!icon && (
          <Image
            style={{ width: 20, height: 20 }}
            resizeMode={'contain'}
            source={icon}
          />
        )}
      </View>
      <View style={styles.titleContainer}>
        <Text style={[styles.title, titleStyles]}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ServiceButton);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 38,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  right: {
    width: '20%',
    paddingLeft: 15,
  },
  title: {
    color: 'white',
  },
  titleContainer: {
    width: '60%',
    alignItems: 'center',
  },
});
