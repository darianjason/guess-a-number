import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Card,
  Input,
  BodyText,
  TitleText,
  MainButton,
} from '../../components/ui';
import { NumberContainer } from '../../components';
import styles from './StartGameScreen.styles';
import Colors from '../../constants/Colors';

const numberInputHandler = (setInputValue, input) => {
  setInputValue(input.replace(/[^0-9]/g, ''));
};

const resetInputHandler = (setInputValue, setConfirmed) => {
  setInputValue('');
  setConfirmed(false);
};

const confirmInputHandler = (
  inputValue,
  setInputValue,
  setConfirmed,
  setSelectedNumber
) => {
  const number = parseInt(inputValue);

  if (isNaN(number) || number <= 0 || number > 99) {
    Alert.alert('Invalid number!', 'Number must be between 1 and 99.', [
      {
        text: 'Ok',
        style: 'destructive',
        onPress: resetInputHandler.bind(this, setInputValue, setConfirmed),
      },
    ]);

    return;
  }

  setConfirmed(true);
  setSelectedNumber(number);
  setInputValue('');
  Keyboard.dismiss();
};

const setConfirmedOutput = (confirmed, selectedNumber, onStartGame) => {
  if (confirmed) {
    return (
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
};

const setButtonDimensions = setButtonWidth => {
  setButtonWidth(Dimensions.get('window').width / 4);
};

const updateButtonDimensions = setButtonWidth => {
  useEffect(() => {
    setButtonDimensions(setButtonWidth);

    Dimensions.addEventListener(
      'change',
      setButtonDimensions.bind(this, setButtonWidth)
    );

    return () => {
      Dimensions.removeEventListener(
        'change',
        setButtonDimensions.bind(this, setButtonWidth)
      );
    };
  }, [setButtonDimensions]);
};

const renderInput = (inputValue, setInputValue) => {
  return (
    <Input
      style={styles.input}
      blurOnSubmit
      autoCapitalize='none'
      autoCorrect={false}
      keyboardType='number-pad'
      maxLength={2}
      onChangeText={numberInputHandler.bind(this, setInputValue)}
      value={inputValue}
    />
  );
};

const renderButton = (width, title, onPress, color) => {
  return (
    <View style={{ width: width }}>
      <Button title={title} onPress={onPress} color={color} />
    </View>
  );
};

const renderInputButtons = (
  buttonWidth,
  inputValue,
  setInputValue,
  setConfirmed,
  setSelectedNumber
) => {
  return (
    <View style={styles.buttonContainer}>
      {renderButton(
        buttonWidth,
        'Reset',
        resetInputHandler.bind(this, setInputValue, setConfirmed),
        Colors.accent
      )}

      {renderButton(
        buttonWidth,
        'Confirm',
        confirmInputHandler.bind(
          this,
          inputValue,
          setInputValue,
          setConfirmed,
          setSelectedNumber
        ),
        Colors.primary
      )}
    </View>
  );
};

const renderInputContainer = (
  buttonWidth,
  inputValue,
  setInputValue,
  setConfirmed,
  setSelectedNumber
) => {
  return (
    <Card style={styles.inputContainer}>
      <BodyText>Select a Number</BodyText>

      {renderInput(inputValue, setInputValue)}

      {renderInputButtons(
        buttonWidth,
        inputValue,
        setInputValue,
        setConfirmed,
        setSelectedNumber
      )}
    </Card>
  );
};

const renderScreen = (
  inputValue,
  setInputValue,
  setConfirmed,
  setSelectedNumber,
  buttonWidth,
  confirmedOutput
) => {
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={32}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>

            {renderInputContainer(
              buttonWidth,
              inputValue,
              setInputValue,
              setConfirmed,
              setSelectedNumber
            )}

            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const StartGameScreen = props => {
  const { onStartGame } = props;

  const [inputValue, setInputValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );

  updateButtonDimensions(setButtonWidth);

  let confirmedOutput = setConfirmedOutput(
    confirmed,
    selectedNumber,
    onStartGame
  );

  return renderScreen(
    inputValue,
    setInputValue,
    setConfirmed,
    setSelectedNumber,
    buttonWidth,
    confirmedOutput
  );
};

export default StartGameScreen;
