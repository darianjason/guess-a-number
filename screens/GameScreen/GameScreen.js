import React, { useState, useRef, useEffect } from 'react';
import { Alert, View, FlatList, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Card, MainButton, TitleText, BodyText } from '../../components/ui';
import { NumberContainer } from '../../components';
import styles from './GameScreen.styles';

const generateRandomNumber = (min, max, exclusion) => {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclusion) {
    return generateRandomNumber(min, max, exclusion);
  }

  return randomNumber;
};

const renderListItem = (listLength, itemData) => (
  <View key={itemData} style={styles.listItem}>
    <BodyText style={{ ...styles.listItemText, ...styles.roundNumber }}>
      #{listLength - itemData.index}
    </BodyText>
    <BodyText style={{ ...styles.listItemText, ...styles.guess }}>
      {itemData.item}
    </BodyText>
  </View>
);

const GameScreen = props => {
  const { userChoice, onGameOver } = props;

  const initialGuess = generateRandomNumber(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get('window').width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  const currentMin = useRef(1);
  const currentMax = useRef(100);

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'higher' && currentGuess > userChoice)
    ) {
      Alert.alert('Wrong hint!', 'Please do not lie to the computer.', [
        { text: 'Sorry', style: 'cancel' },
      ]);

      return;
    }

    if (direction === 'lower') {
      currentMax.current = currentGuess;
    }

    if (direction === 'higher') {
      currentMin.current = currentGuess + 1;
    }

    const nextGuess = generateRandomNumber(
      currentMin.current,
      currentMax.current,
      currentGuess
    );

    setCurrentGuess(nextGuess);
    setPastGuesses(currentPastGuesses => [nextGuess, ...currentPastGuesses]);
  };

  let listContainerStyle = styles.listContainer;

  if (availableDeviceWidth < 350) {
    listContainerStyle = styles.listContainerBig;
  }

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <TitleText style={styles.title}>Computer guessed: </TitleText>

        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
            <Feather name='minus' size={24} color='white' />
          </MainButton>

          <NumberContainer>{currentGuess}</NumberContainer>

          <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
            <Feather name='plus' size={24} color='white' />
          </MainButton>
        </View>

        <View style={listContainerStyle}>
          <FlatList
            data={pastGuesses}
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            keyExtractor={item => item}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <TitleText style={styles.title}>Computer guessed: </TitleText>

      <NumberContainer>{currentGuess}</NumberContainer>

      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
          <Feather name='minus' size={24} color='white' />
        </MainButton>

        <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
          <Feather name='plus' size={24} color='white' />
        </MainButton>
      </Card>

      <View style={listContainerStyle}>
        <FlatList
          data={pastGuesses}
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          keyExtractor={item => item}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

export default GameScreen;
