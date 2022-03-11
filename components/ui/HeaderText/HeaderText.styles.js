import { StyleSheet } from 'react-native';

import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'major-mono-display',
    fontSize: 24,
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
  },
});

export default styles;
