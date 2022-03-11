import { StyleSheet } from 'react-native';

import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    paddingTop: 36,
    paddingBottom: 18,
    alignItems: 'center',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
});

export default styles;
