import React from 'react';
import { View, Platform } from 'react-native';

import HeaderText from '../HeaderText/HeaderText';
import styles from './Header.styles';

const Header = props => {
  return (
    <View
      style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid,
        }),
      }}
    >
      <HeaderText>{props.title}</HeaderText>
    </View>
  );
};

export default Header;
