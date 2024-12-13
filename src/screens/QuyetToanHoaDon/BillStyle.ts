import { Dimensions, StyleSheet } from "react-native";

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F8FE',
      padding: width * 0.03,
    },
    header: {
      fontSize: width * 0.06,
      fontWeight: 'bold',
      color: '#ff3333',
      marginBottom: height * 0.02,
      textAlign: 'center',
    },
    searchInput: {
      height: height * 0.07,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: width * 0.03,
      marginBottom: height * 0.02,
    },
    scrollView: {
      paddingBottom: height * 0.02,
    },
    billContainer: {
      backgroundColor: '#fff',
      padding: width * 0.03,
      borderRadius: 8,
      marginBottom: height * 0.02,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 5},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 10,
    },
    billInfo: {
      flex: 3,
    },
    billText: {
      fontSize: width * 0.04,
      paddingBottom: 8,
      color: '#333',
    },
    boldText: {
      fontWeight: 'bold',
      color: '#333',
    },
    billText1: {
      fontSize: width * 0.04,
      paddingBottom: 8,
      color: 'black',
    },
    totalText: {
      fontSize: width * 0.04,
      fontWeight: 'bold',
      color: '#ff3333',
    },
    billActions: {
      flex: 1.8,
      alignItems: 'flex-end',
    },
    durationText: {
      fontSize: width * 0.03,
      marginBottom: height * 0.01,
      color: '#333',
    },
    detailButton: {
      backgroundColor: '#4da6ff',
      paddingVertical: height * 0.005,
      paddingHorizontal: width * 0.06,
      borderRadius: 4,
      marginBottom: height * 0.01,
    },
    detailText: {
      color: '#fff',
    },
    paymentButton: {
      backgroundColor: '#33cc33',
      paddingVertical: height * 0.006,
      paddingHorizontal: width * 0.022,
      borderRadius: 4,
    },
    paymentText: {
      color: '#fff',
    },
    emptyText: {
      textAlign: 'center',
      fontSize: 18,
      color: 'red',
      marginTop: 20,
      fontWeight: 'bold',
    },
    loadingText: {
      marginTop: 10,
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });