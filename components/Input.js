import React from "react";
import { TextInput, StyleSheet } from "react-native";

const Input = (props) => {
  return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
});

export default Input;
