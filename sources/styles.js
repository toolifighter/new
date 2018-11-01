import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    inputContainer: {
      marginTop: 40,
      padding: 40,
      backgroundColor: '#333',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-around',      
    },
    inputText: {
      color: '#ccc',
      fontSize: 20,
    },
    inputPicker: {
      color: '#ccc',
    },
    bmiContainer: {
      maxHeight: 300,
      minHeight: 300,
    },
    calContainer: {
      maxHeight: 450,
      minHeight: 450,
    },
    notification: {
      marginTop: 5,
      marginBottom: 5,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 5,
    },
    notificationImage: {
      width: 300,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    outputText: {
      textAlign: 'center',
      fontSize: 18,
    },
    outputContainer: {
      padding: 20,
    },
    containerMeasure: {
      flex: 1,
      justifyContent: 'space-around',
    },
    container: {
      flex: 1,
      paddingTop: 60,
      justifyContent: "flex-start",
      backgroundColor: '#fff',
    },
    headertext: {
      fontSize: 30,
      textAlign: 'center',
    },
  });
  export default styles;