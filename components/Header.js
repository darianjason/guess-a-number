import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";
import HeaderText from "./HeaderText";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <HeaderText>{props.title}</HeaderText>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 36,
    paddingBottom: 18,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
});

export default Header;
