import { StyleSheet } from 'react-native';

import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'atkinson-hyperlegible',
    fontSize: 18,
  },
});

export default styles;
