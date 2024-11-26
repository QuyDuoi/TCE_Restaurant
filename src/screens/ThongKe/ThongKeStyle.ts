import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    noDataText: {
      fontSize: 20,
      color: 'gray',
      textAlign: 'center',
      marginTop: 200,
    },
    rectangle: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 10,
      backgroundColor: '#ADD8E6',
      marginHorizontal: 16,
      marginTop: 10
    },
    modalOption: {
      paddingVertical: 15,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.8,
      width: '90%',
    },
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 19,
      marginBottom: 16,
    },
    optionsButton: {
      padding: 10,
      marginRight: 10,
      marginTop: 0,
    },
    Contenttt: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 1,
    },
    button: {
      backgroundColor: '#AAA0E0',
      padding: 0,
      borderColor: '#000',
      borderRadius: 15,
      marginBottom: -10,
      marginLeft: 30,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
    selectedText: {
      marginTop: 10,
      fontSize: 14,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '85%',
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 15,
      elevation: 5,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 15,
      color: 'black'
    },
    option: {
      paddingVertical: 15,
      borderBottomColor: 'gray',
      borderBottomWidth: 0.8,
      paddingHorizontal: 60,
    },
    optionText: {
      fontSize: 19,
      textAlign: 'center',
      color: 'black'
    },
    closeButton: {
      backgroundColor: '#f44336',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      marginTop: 20,
      width: 100
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 17,
      fontWeight: 'bold'
    },
    chartContainer: {
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    legendContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20,
    },
    legendItemContainer: {
      alignItems: 'center',
    },
    legendItem: {
      padding: 10,
      borderRadius: 5,
    },
    legendLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 4,
    },
    legendText: {
      fontSize: 18,
      color: 'black',
    },
    dateButton: {
      padding: 15,
      backgroundColor: '#007BFF',
      borderRadius: 5,
      marginVertical: 10,
    },
    dateButtonText: {
      color: '#fff',
      fontSize: 16
    },
    data: {
      color: 'black',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: 'gray',
    },  
    legendTextMon: {
        fontSize: 18,
        color: 'black'
    },
    topItem: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    }
  });