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

const StartGameScreen = props => {
  const [inputValue, setInputValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get('window').width / 4
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get('window').width / 4);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const { onStartGame } = props;

  const numberInputHandler = input => {
    setInputValue(input.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setInputValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const number = parseInt(inputValue);

    if (isNaN(number) || number <= 0 || number > 99) {
      Alert.alert('Invalid number!', 'Number must be between 1 and 99.', [
        { text: 'Ok', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }

    setConfirmed(true);
    setSelectedNumber(number);
    setInputValue('');
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
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={32}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game!</TitleText>

            <Card style={styles.inputContainer}>
              <BodyText>Select a Number</BodyText>

              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize='none'
                autoCorrect={false}
                keyboardType='number-pad'
                maxLength={2}
                onChangeText={numberInputHandler}
                value={inputValue}
              />

              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title='Reset'
                    onPress={resetInputHandler}
                    color={Colors.accent}
                  />
                </View>

                <View style={{ width: buttonWidth }}>
                  <Button
                    title='Confirm'
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

export default StartGameScreen;
