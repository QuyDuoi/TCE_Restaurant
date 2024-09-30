import {StyleSheet, useWindowDimensions} from 'react-native';
import {colors} from '../contants/hoaColors';

//const {height, width} = useWindowDimensions();

export const hoaStyles = StyleSheet.create({
  container: {
    width: '93%',
    height: '95%',
    margin: 5,
  },
  containerTopping: {
    width: '98%',
    height: '99%',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
  image: {
    width: 70,
    height: 55,
    borderRadius: 10,
  },
  indicator: {
    borderBottomWidth: 2,

    borderBottomColor: colors.text,
  },
  inputContainer: {
    backgroundColor: colors.desc,
    borderRadius: 10,
  },
  section: {
    paddingHorizontal: 8,
    marginVertical: 8,
  },
  card: {
    borderRadius: 8,
  },
  modelContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modelContent: {
    width: '85%',
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: 'center',
    padding: 5,
  },
});
