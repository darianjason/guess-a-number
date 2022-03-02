import React from "react";

import { Text, StyleSheet } from "react-native";

const HeaderText = (props) => {
  return (
    <Text style={{ ...styles.header, ...props.style }}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontFamily: "major-mono-display",
    fontSize: 24,
    color: "white",
  },
});

export default HeaderText;
