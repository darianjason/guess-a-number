import React from 'react';
import { View, Image, Text, ScrollView } from 'react-native';

import { BodyText, MainButton, TitleText } from '../../components/ui';
import { NumberContainer } from '../../components';
import styles from './GameOverScreen.styles';

const GameOverScreen = props => {
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
              uri: 'https://images.unsplash.com/photo-1504870712357-65ea720d6078?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=75',
            }}
            style={styles.image}
            resizeMode='cover'
            fadeDuration={500} // fade animation while image loads from uri
          />
        </View>
        <View style={styles.resultContainer}>
          <BodyText style={styles.resultText}>
            The computer needed <Text style={styles.highlight}>{rounds}</Text>{' '}
            round(s) to guess <Text style={styles.highlight}>{userNumber}</Text>
          </BodyText>
        </View>
        <MainButton onPress={onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;
