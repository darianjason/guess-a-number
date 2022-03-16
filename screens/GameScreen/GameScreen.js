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

const nextGuessHandler = (
  direction,
  currentGuess,
  userChoice,
  setCurrentGuess,
  setPastGuesses,
  currentMin,
  currentMax
) => {
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

const setListContainerStyle = availableDeviceWidth => {
  if (availableDeviceWidth < 350) {
    return styles.listContainerBig;
  }

  return styles.listContainer;
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

const setAvailableDimensions = (
  setAvailableDeviceWidth,
  setAvailableDeviceHeight
) => {
  setAvailableDeviceWidth(Dimensions.get('window').width);
  setAvailableDeviceHeight(Dimensions.get('window').height);
};

const updateLayout = (setAvailableDeviceWidth, setAvailableDeviceHeight) => {
  useEffect(() => {
    setAvailableDimensions(setAvailableDeviceWidth, setAvailableDeviceHeight);

    Dimensions.addEventListener(
      'change',
      setAvailableDimensions.bind(
        this,
        setAvailableDeviceWidth,
        setAvailableDeviceHeight
      )
    );

    return () => {
      Dimensions.removeEventListener(
        'change',
        setAvailableDimensions.bind(
          this,
          setAvailableDeviceWidth,
          setAvailableDeviceHeight
        )
      );
    };
  });
};

const checkGameOver = (currentGuess, userChoice, pastGuesses, onGameOver) => {
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
};

const renderControlsLandscape = (
  currentGuess,
  userChoice,
  setCurrentGuess,
  setPastGuesses,
  currentMin,
  currentMax
) => {
  return (
    <View style={styles.controlsLandscape}>
      <MainButton
        onPress={nextGuessHandler.bind(
          this,
          'lower',
          currentGuess,
          userChoice,
          setCurrentGuess,
          setPastGuesses,
          currentMin,
          currentMax
        )}
      >
        <Feather name='minus' size={24} color='white' />
      </MainButton>

      <NumberContainer>{currentGuess}</NumberContainer>

      <MainButton
        onPress={nextGuessHandler.bind(
          this,
          'higher',
          currentGuess,
          userChoice,
          setCurrentGuess,
          setPastGuesses,
          currentMin,
          currentMax
        )}
      >
        <Feather name='plus' size={24} color='white' />
      </MainButton>
    </View>
  );
};

const renderControlsPortrait = (
  currentGuess,
  userChoice,
  setCurrentGuess,
  setPastGuesses,
  currentMin,
  currentMax
) => {
  return (
    <View style={styles.controlsPortrait}>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card style={styles.buttonContainer}>
        <MainButton
          onPress={nextGuessHandler.bind(
            this,
            'lower',
            currentGuess,
            userChoice,
            setCurrentGuess,
            setPastGuesses,
            currentMin,
            currentMax
          )}
        >
          <Feather name='minus' size={24} color='white' />
        </MainButton>

        <MainButton
          onPress={nextGuessHandler.bind(
            this,
            'higher',
            currentGuess,
            userChoice,
            setCurrentGuess,
            setPastGuesses,
            currentMin,
            currentMax
          )}
        >
          <Feather name='plus' size={24} color='white' />
        </MainButton>
      </Card>
    </View>
  );
};

const renderControls = (
  availableDeviceHeight,
  currentGuess,
  userChoice,
  setCurrentGuess,
  setPastGuesses,
  currentMin,
  currentMax
) => {
  if (availableDeviceHeight < 500) {
    return renderControlsLandscape(
      currentGuess,
      userChoice,
      setCurrentGuess,
      setPastGuesses,
      currentMin,
      currentMax
    );
  }

  return renderControlsPortrait(
    currentGuess,
    userChoice,
    setCurrentGuess,
    setPastGuesses,
    currentMin,
    currentMax
  );
};

const renderPastGuessesList = (availableDeviceWidth, pastGuesses) => {
  const listContainerStyle = setListContainerStyle(availableDeviceWidth);

  return (
    <View style={listContainerStyle}>
      <FlatList
        data={pastGuesses}
        renderItem={renderListItem.bind(this, pastGuesses.length)}
        keyExtractor={item => item}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const setContent = (
  availableDeviceWidth,
  availableDeviceHeight,
  currentGuess,
  setCurrentGuess,
  userChoice,
  pastGuesses,
  setPastGuesses,
  currentMin,
  currentMax
) => {
  return (
    <View style={styles.screen}>
      <TitleText style={styles.title}>Computer guessed: </TitleText>

      {renderControls(
        availableDeviceHeight,
        currentGuess,
        userChoice,
        setCurrentGuess,
        setPastGuesses,
        currentMin,
        currentMax
      )}

      {renderPastGuessesList(availableDeviceWidth, pastGuesses)}
    </View>
  );
};

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

  updateLayout(setAvailableDeviceWidth, setAvailableDeviceHeight);

  checkGameOver(currentGuess, userChoice, pastGuesses, onGameOver);

  const currentMin = useRef(1);
  const currentMax = useRef(100);

  let content = setContent(
    availableDeviceWidth,
    availableDeviceHeight,
    currentGuess,
    setCurrentGuess,
    userChoice,
    pastGuesses,
    setPastGuesses,
    currentMin,
    currentMax
  );

  return content;
};

export default GameScreen;
