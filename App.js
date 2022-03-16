import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Header } from './components';
import { StartGameScreen, GameScreen, GameOverScreen } from './screens';
import styles from './App.styles';

const fetchFonts = () => {
  Font.loadAsync({
    'atkinson-hyperlegible': require('./assets/fonts/AtkinsonHyperlegible-Regular.ttf'),
    'atkinson-hyperlegible-bold': require('./assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
    'major-mono-display': require('./assets/fonts/MajorMonoDisplay-Regular.ttf'),
  });
};

const loadData = setDataLoaded => {
  return (
    <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={error => console.error(error)}
    />
  );
};

const configureNewGameHandler = (setRounds, setUserNumber) => {
  setRounds(0);
  setUserNumber(null);
};

const startGameHandler = (setRounds, setUserNumber, selectedNumber) => {
  setRounds(0);
  setUserNumber(selectedNumber);
};

const gameOverHandler = (setRounds, rounds) => {
  setRounds(rounds);
};

const setContent = (rounds, setRounds, userNumber, setUserNumber) => {
  let content = (
    <StartGameScreen
      onStartGame={startGameHandler.bind(this, setRounds, setUserNumber)}
    />
  );

  if (userNumber && rounds <= 0) {
    content = (
      <GameScreen
        userChoice={userNumber}
        onGameOver={gameOverHandler.bind(this, setRounds)}
      />
    );
  } else if (rounds > 0) {
    content = (
      <GameOverScreen
        rounds={rounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler.bind(this, setRounds, setUserNumber)}
      />
    );
  }

  return content;
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return loadData(setDataLoaded);
  }

  let content = setContent(rounds, setRounds, userNumber, setUserNumber);

  return (
    <SafeAreaView style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
    </SafeAreaView>
  );
}
