import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ScrollView, Text, ActivityIndicator, Button, TextInput, Picker } from 'react-native';
import styles from './styles';
import globalData from './global-state';

export default class Calories extends React.Component {
  state = {
    isLoadingComplete: false,
    notification: null,
    sex: null,
    gewicht: globalData.userWeight,
    groesse: globalData.userHeight,
    alter: '',
    grundumsatz: null,
    notification: null,
    bgColorNotification: null,
    isExecuted: false,
  };

  Loschen = () => {
    this.setState({
      isLoadingComplete: false,
      notification: null,
      sex: null,
      gewicht: '',
      groesse: '',
      alter: '',
      grundumsatz: null,
      notification: null,
      bgColorNotification: null,
      isExecuted: false,
    })
    console.log(this.state.groesse);
  }

  autoFill = () => {
    this.setState({
      gewicht: globalData.userWeight,
      groesse: globalData.userHeight,
    })
    console.log(this.state.groesse, 'g');
  }

  eingabeGewicht = (val) => {
    this.setState({
      gewicht: val,
    })
    globalData.globalData.userWeight = val;
  }

  eingabeGroesse = (val) => {
    this.setState({
      groesse: val,
    })
    globalData.userHeight = val;
    console.log(globalData.userHeight);
  }

  eingabeAlter = (val) => {
    this.setState({
      alter: val,
    })
  }

  berechnenGrundumsatz = () => {
    this.setState({isExecuted: true})
    let h = parseInt(this.state.groesse);
    let g = parseInt(this.state.gewicht);
    let a = parseInt(this.state.alter);
    let u = null;
    switch (this.state.sex) {
      case ("m"):
      u = (66,47 + (13,7 * g) + (5 * h) - (6,8 * a));
      break;
      case ("w"):
      u = (655,1 + (9,6 * g) + (1,8 * h) - (4,7 * a));
      break;
    }
    if (typeof u == "number" && true != isNaN(u)) {      
      this.setState({
        notification: 'Ihr Grundumsatz beträgt ' + u + ' kcal.',
        bgColorNotification: '#ccc',
      });
    } else {      
      this.setState({
        notification: 'Fehler: Bitte geben Sie alle Werte korrekt ein!',
        bgColorNotification: '#FE4141',
      });
    }
    console.log(u);
  }

  render() {
    return <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headertext}>Kalorienrechner</Text>
        <View style={[styles.inputContainer, styles.calContainer]}>
          <Text style={styles.inputText}>Geschlecht:</Text>
          <Picker
            selectedValue={this.state.sex}
            style={[styles.inputPicker]}
            onValueChange={(itemValue,) => this.setState({sex: itemValue})}>
            <Picker.Item label="Auswählen" value="" style={styles.inputText}/>
            <Picker.Item label="weiblich" value="w" style={styles.inputText}/>
            <Picker.Item label="männlich" value="m" style={styles.inputText}/>
          </Picker>
          <Text style={styles.inputText}>Größe (cm):</Text>
          <TextInput onChangeText={this.eingabeGroesse} value={this.state.groesse} style={styles.inputText}></TextInput>
          <Text style={styles.inputText}>Gewicht (kg):</Text>
          <TextInput onChangeText={this.eingabeGewicht} value={this.state.gewicht} style={styles.inputText}></TextInput>
          <Text style={styles.inputText}>Alter:</Text>
          <TextInput onChangeText={this.eingabeAlter} value={this.state.alter} style={styles.inputText}></TextInput>
        </View>
        <View style={styles.outputContainer}>
          <Button onPress={this.autoFill} title="Automatisch ausfüllen" />
        </View>
        <View style={styles.outputContainer}>
          <Button onPress={this.berechnenGrundumsatz} title="Grundumsatz berechnen"/>
        </View>
        {this.state.isExecuted ? <View style={[styles.outputContainer, {backgroundColor: this.state.bgColorNotification}, styles.notification]}>
          <Text style={styles.outputText}>{this.state.notification}</Text>
        </View> : null}
        <View style={styles.outputContainer}>
          <Button onPress={this.Loschen} title="Reset" />
        </View>
      </View>
    </ScrollView>    
  }    
}