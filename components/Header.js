import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';
import HeaderText from './HeaderText';

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

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    paddingTop: 36,
    paddingBottom: 18,
    alignItems: 'center',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
});

export default Header;
