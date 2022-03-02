import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const GameOverScreen = (props) => {
  const { rounds, userNumber, onRestart } = props;

  return (
    <View style={styles.screen}>
      <NumberContainer>{userNumber}</NumberContainer>
      <TitleText style={styles.title}>Game Over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1504870712357-65ea720d6078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=75",
          }}
          style={styles.image}
          resizeMode="cover"
          fadeDuration={500} // fade animation while image loads from uri
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          The computer needed <Text style={styles.highlight}>{rounds}</Text>{" "}
          round(s) to guess <Text style={styles.highlight}>{userNumber}</Text>
        </BodyText>
      </View>
      <MainButton onPress={onRestart}>New Game</MainButton>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginVertical: 16,
  },
  resultContainer: {
    paddingHorizontal: 32,
  },
  resultText: {
    fontSize: 18,
    marginVertical: 16,
    textAlign: "center",
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderColor: "black",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  highlight: {
    color: Colors.accent,
    fontFamily: "atkinson-hyperlegible-bold",
  },
});

export default GameOverScreen;
