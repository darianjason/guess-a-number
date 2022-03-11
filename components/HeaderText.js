import React from 'react';

import { Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const HeaderText = props => {
  return (
    <Text style={{ ...styles.headerText, ...props.style }}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'major-mono-display',
    fontSize: 24,
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
  },
});

export default HeaderText;
