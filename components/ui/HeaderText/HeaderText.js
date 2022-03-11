import React from 'react';
import { Text } from 'react-native';

import styles from './HeaderText.styles';

const HeaderText = props => {
  return (
    <Text style={{ ...styles.headerText, ...props.style }}>
      {props.children}
    </Text>
  );
};

export default HeaderText;
