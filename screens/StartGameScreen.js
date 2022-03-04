import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import Card from "../components/Card";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  // runs on every re-render
  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };

    Dimensions.addEventListener("change", updateLayout); // update layout whenever the screen is resized (& re-rendered)

    return () => { // cleanup function: runs right before useEffect runs
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const { onStartGame } = props;

  const numberInputHandler = (input) => {
    setInputValue(input.replace(/[^0-9]/g, "")); // regex to delete non-number characters
  };

  const resetInputHandler = () => {
    setInputValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const number = parseInt(inputValue);

    if (isNaN(number) || number <= 0 || number > 99) {
      // Alert is a React Native object which calls native alert API
      Alert.alert("Invalid number!", "Number must be between 1 and 99.", [
        { text: "Ok", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }

    setConfirmed(true);
    setSelectedNumber(number);
    setInputValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected:</BodyText>
        <NumberContainer style={styles.selectedNumber}>
          {selectedNumber}
        </NumberContainer>
        <MainButton onPress={onStartGame.bind(this, selectedNumber)}>
          Start Game
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={32}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss(); // dismiss keyboard when touching somewhere else
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>

            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>

              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad" // Android still shows decimal point, still have to validate
                maxLength={2}
                onChangeText={numberInputHandler}
                value={inputValue}
              />

              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    onPress={resetInputHandler}
                    color={Colors.accent}
                  />
                </View>

                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>

            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 8,
    alignItems: "center",
  },
  title: {
    marginVertical: 8,
  },
  inputContainer: {
    width: "75%",
    maxWidth: "90%",
    minWidth: 300,
    marginVertical: 16,
    alignItems: "center",
  },
  input: {
    height: 48,
    width: "25%",
    textAlign: "center",
    fontFamily: "atkinson-hyperlegible-bold",
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  summaryContainer: {
    marginVertical: 16,
    alignItems: "center",
  },
  selectedNumber: {
    marginVertical: 16,
  },
});

export default StartGameScreen;
