import React from 'react';
import { Text, View } from 'react-native';

import styles from './NumberContainer.styles';

const NumberContainer = props => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

export default NumberContainer;
