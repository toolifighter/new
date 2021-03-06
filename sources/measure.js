import React from 'react';
import styles from './styles';
import { Accelerometer } from "expo";
import { Platform, StatusBar, StyleSheet, View, Text, ActivityIndicator, Button, TextInput, Picker, ScrollView } from 'react-native';


const Value = ({name, value}) => (
    <View style={styles.valueContainer}>
      <Text style={styles.valueName}>{name}:</Text>
      <Text style={styles.valueValue}>{new String(value).substr(0, 8)}</Text>
    </View>
  )

export default class BMI extends React.Component {
    state = {
        x: 0,
        y: 0,
        z: 0,        
        notificationS: null,
        notificationT: null,
        time: null,
        distance: null,
        indicatorStatus: false,
        isMeasured: false,
      }

    helper = {
      mesurementData:[],
    }

    constructor(props) {
        super(props);
        Accelerometer.setUpdateInterval(10);
      }
      Loschen = () => {
        this.setState({
          x: 0,
          y: 0,
          z: 0,
          notificationS: null,
          notificationT: null,
          time: null,
          distance: null,
          indicatorStatus: false,
          isMeasured: false,
        })
        this.helper.measurementData = [];
    }
      measureStart = (val) => {
        this.helper.measurementData = [];
        this.setState ({
          indicatorStatus: true,
        }, () => {
          console.log('accelerometer');
          Accelerometer.setUpdateInterval(10);
          Accelerometer.addListener(accelerometerData => {
            let foo = this.helper.measurementData;
            foo.push({
              x: accelerometerData.x*9.81, 
              y: accelerometerData.y*9.81, 
              z: accelerometerData.z*9.81-9.81,
            })
            this.helper = ({ measurementData: foo}); 
          });
        })
        
      }
      
      measureStop = (val) => {

        Accelerometer.removeAllListeners()

        let data = this.helper.measurementData;       
        let filtered = 0;

        for (let g = 0; g < data.length; g++) {
          if ((data[g].x + data[g].y + data[g].z ) < -8) {
            filtered += 1;
          }          
        }

        let fm = filtered;
        let t = fm * 0.01;
        let s = (9.81/2)*(t*t);
      
        this.setState({
          notificationS: 'Gemessene Strecke: ' + s.toFixed(2) + 'm',
          notificationT: '(in ' + t + ' s)',
          indicatorStatus: false,
          isMeasured: true,
        })
      }

      render() {
        return (
          <ScrollView>
            <View style={styles.container}>
              <Text style={styles.headertext}>Höhenmessung</Text>
              <View style={[styles.inputContainer, {maxHeight: 350}]}>
                <Text style={styles.inputText}>Halten Sie Ihr Smartphone mit dem Display nach oben. Drücken Sie den Start-Button und lassen Sie es fallen. Drücken Sie dann den Stopp-Button.</Text>
              </View>
              <View  style={styles.outputContainer}>
                <Button onPress={this.measureStart} title="Starten" style={styles.button}></Button>
              </View>
              <View  style={styles.outputContainer}>
                <Button onPress={this.measureStop} title="Stoppen" style={styles.button}></Button>
              </View>
              <View style={styles.outputContainer}>
                {this.state.indicatorStatus ? <View style={styles.outputContainer}><ActivityIndicator size="large"/></View> : null}
                {this.state.isMeasured ? <View style={[styles.notification, styles.outputContainer, {backgroundColor: '#ccc'}]}>
                  <Text style={styles.outputText}>{this.state.notificationS}</Text>
                  <Text style={styles.outputText}>{this.state.notificationT}</Text>
                </View> : null}
                <View style={styles.outputContainer}>
                  <Button onPress={this.Loschen} title="Reset"/>
                </View>
              </View>
            </View>
          </ScrollView>            
        );
      }
    }

