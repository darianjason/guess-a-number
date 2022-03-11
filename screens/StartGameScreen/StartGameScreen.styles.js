import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
  },
  title: {
    marginVertical: 8,
  },
  inputContainer: {
    width: '75%',
    maxWidth: '90%',
    minWidth: 300,
    marginVertical: 16,
    alignItems: 'center',
  },
  input: {
    height: 48,
    width: '25%',
    textAlign: 'center',
    fontFamily: 'atkinson-hyperlegible-bold',
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  summaryContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  selectedNumber: {
    marginVertical: 16,
  },
});

export default styles;
