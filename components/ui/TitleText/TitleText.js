import React from 'react';
import { Text } from 'react-native';

import styles from './TitleText.styles';

const TitleText = props => {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
};

export default TitleText;
