import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';

import { BodyText, MainButton, TitleText } from '../../components/ui';
import { NumberContainer } from '../../components';
import styles from './GameOverScreen.styles';

const renderImage = (uri, resizeMode, fadeDuration) => {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: uri,
        }}
        style={styles.image}
        resizeMode={resizeMode}
        fadeDuration={fadeDuration}
      />
    </View>
  );
};

const renderResult = (rounds, userNumber) => {
  return (
    <View style={styles.resultContainer}>
      <BodyText style={styles.resultText}>
        The computer needed <Text style={styles.highlight}>{rounds}</Text>{' '}
        round(s) to guess <Text style={styles.highlight}>{userNumber}</Text>
      </BodyText>
    </View>
  );
};

const renderScreen = (userNumber, rounds, onRestart) => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <NumberContainer style={styles.numberContainer}>
          {userNumber}
        </NumberContainer>

        <TitleText style={styles.title}>Game Over</TitleText>

        {renderImage(
          'https://images.unsplash.com/photo-1504870712357-65ea720d6078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=75',
          'cover',
          500
        )}

        {renderResult(rounds, userNumber)}

        <MainButton onPress={onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

const GameOverScreen = props => {
  const { rounds, userNumber, onRestart } = props;

  return renderScreen(userNumber, rounds, onRestart);
};

export default GameOverScreen;
