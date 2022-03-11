import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    // drop shadow for iOS
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // drop shadow for Android
    elevation: 8,
  },
});

export default Card;
