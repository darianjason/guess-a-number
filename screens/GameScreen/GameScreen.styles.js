import { StyleSheet, Dimensions } from 'react-native';

import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  title: {
    marginBottom: 8,
  },
  controls: {
    width: '75%',
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonContainer: {
    width: Dimensions.get('window').width > 350 ? '75%' : '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Dimensions.get('window').height > 600 ? 16 : 8,
  },
  listContainer: {
    flex: 1,
    width: '75%',
    justifyContent: 'flex-end',
  },
  listContainerBig: {
    flex: 1,
    width: '90%',
    justifyContent: 'flex-end',
  },
  listItem: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 18,
  },
  roundNumber: {
    fontFamily: 'atkinson-hyperlegible',
    color: Colors.accent,
  },
  guess: {
    fontFamily: 'atkinson-hyperlegible-bold',
    color: Colors.primary,
  },
});

export default styles;
