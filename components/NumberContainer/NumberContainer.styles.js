import { StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: Colors.primary,
    fontFamily: 'atkinson-hyperlegible-bold',
    fontSize: 24,
  },
});

export default styles;
