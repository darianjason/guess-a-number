import React from 'react';
import { Text } from 'react-native';

import styles from './BodyText.styles';

const BodyText = props => {
  return (
    <Text style={{ ...styles.body, ...props.style }}>{props.children}</Text>
  );
};

export default BodyText;
