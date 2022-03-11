import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: Dimensions.get('window').width < 350 ? 21 : 24,
    marginVertical: Dimensions.get('window').height / 60,
  },
  resultContainer: {
    paddingHorizontal: 32,
    marginVertical: Dimensions.get('window').height / 40,
  },
  resultText: {
    fontSize: Dimensions.get('window').width < 350 ? 14 : 18,
    textAlign: 'center',
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderColor: 'black',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  highlight: {
    color: Colors.accent,
    fontFamily: 'atkinson-hyperlegible-bold',
  },
});

export default styles;
