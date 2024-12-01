import {Dimensions, StyleSheet, useWindowDimensions} from 'react-native';
import {colors} from '../contants/hoaColors';

const {width: MaxWidth, height: MaxHeight} = Dimensions.get('window');

export const hoaStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    margin: 5,
    alignSelf: 'center',
  },
  containerTopping: {
    width: MaxWidth * 0.98,
    height: '99%',
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
    width: 60,
    height: 60,
    borderRadius: 5,
    alignSelf: 'center',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '89%',
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 5,
  },
  tabViewContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  tabViewScene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator2: {
    width: '100%',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5,
    borderColor: colors.desc2,
  },
  hiddenDeleteView: {
    height: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  buttonDelete: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  buttonMoCa: {
    backgroundColor: '#FF602B',
    width: '25%',
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  textMoCa: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  viewMoCa: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  viewInput: {
    width: '68%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    height: 50,
    borderWidth: 0.5,
    elevation: 10,
  },
  inputMoCa: {
    width: '70%',
    paddingLeft: 10,
    color: 'black',
  },
  buttonXacNhan: {
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#F6BE45',
    alignItems: 'center',
    width: '30%',
    height: '100%',
    justifyContent: 'center',
  },
  textXacNhan: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
