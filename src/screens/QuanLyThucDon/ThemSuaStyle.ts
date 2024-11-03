import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    scrollContainer: {
      paddingBottom: 100,
    },
    imageSection: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    imageTittle: {
      width: '72%',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    },
    imageDescription: {
      fontSize: 12,
      color: '#999',
      marginBottom: 10,
    },
    required: {
      color: 'red',
    },
    uploadButton: {
      borderWidth: 1,
      borderColor: '#ff4500',
      borderRadius: 8,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderStyle: 'dashed',
      width: 100,
      height: 100,
    },
    uploadButtonText: {
      color: '#ff4500',
      fontSize: 16,
      textAlign: 'center',
    },
    uploadedImage: {
      width: 100,
      height: 100,
      borderRadius: 8,
    },
    overlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 30,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomEndRadius: 8,
      borderBottomStartRadius: 8,
    },
    overlayText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
      width: '100%',
      justifyContent: 'space-between',
    },
    rowMoTa: {
      flexDirection: 'row',
      marginTop: 15,
      width: '100%',
      justifyContent: 'space-between',
    },
    label: {
      width: '25%',
      fontSize: 14,
      color: 'black',
      fontWeight: 'bold'
    },
    labelMoTa: {
      width: '25%',
      fontSize: 14,
      color: 'black',
      marginTop: 8,
      fontWeight: 'bold'
    },
    input: {
      width: '75%',
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    categoryButton: {
      width: '70%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 10,
      justifyContent: 'center',
    },
    categoryButtonText: {
      fontSize: 14,
      color: '#000',
    },
    saveButton: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ff4500',
      padding: 16,
      alignItems: 'center',
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    errorText: {
      color: 'red',
      fontSize: 14,
      textAlign: 'right',
      marginTop: 5,
    },
    errorBorder: {
      borderBottomColor: 'red',
    },
    dropdown: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      width: '75%',
      alignItems: 'center',
    },
    inputMoTa: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      width: '75%',
      height: 100,
      padding: 10,
      textAlignVertical: 'top',
    },
  });