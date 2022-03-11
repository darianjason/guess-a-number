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

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={error => console.log(error)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setRounds(0);
  };

  const gameOverHandler = rounds => {
    setRounds(rounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && rounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (rounds > 0) {
    content = (
      <GameOverScreen
        rounds={rounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title='Guess a Number' />
      {content}
    </SafeAreaView>
  );
}
