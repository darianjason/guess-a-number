import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";

import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";

const GameOverScreen = (props) => {
  const { rounds, userNumber, onRestart } = props;

  return (
    <ScrollView>
      <View style={styles.screen}>
        <NumberContainer style={styles.numberContainer}>
          {userNumber}
        </NumberContainer>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  numberContainer: {
    marginTop: Dimensions.get("window").height > 600 ? 24 : 16,
  },
  title: {
    fontSize: Dimensions.get("window").width < 350 ? 21 : 24,
    marginVertical: Dimensions.get("window").height / 60,
  },
  resultContainer: {
    paddingHorizontal: 32,
    marginVertical: Dimensions.get("window").height / 40,
  },
  resultText: {
    fontSize: Dimensions.get("window").width < 350 ? 14 : 18,
    textAlign: "center",
  },
  imageContainer: {
    width: Dimensions.get("window").width * 0.7,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2,
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
