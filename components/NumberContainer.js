import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/colors";

const NumberContainer = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    color: Colors.primary,
    fontFamily: "atkinson-hyperlegible-bold",
    fontSize: 24,
  },
});

export default NumberContainer;
