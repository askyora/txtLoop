// Example to Send Text SMS on Button Click in React Native
// https://aboutreact.com/send-text-sms-in-react-native/

// import React in our code
import React, {useState} from 'react';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  PermissionsAndroid,
  Button,
} from 'react-native';

import {NativeModules} from 'react-native';
var DirectSms = NativeModules.DirectSms;

const ShortMessage = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [count, setCount] = useState('0');
  const [disabled, setDisabled ] = useState(false);
  



  async function sendDirectSms() {

    if (count < 1 || bodyText === '' || mobileNumber === '') {
      return;
    }
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      {
        title: 'YourProject App Sms Permission',
        message:
          'YourProject App needs access to your inbox ' +
          'so you can send messages in background.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      Alert.alert(
        'Confirmation',
        'Are you sure you want to forward '+count+ " Message(s) to " + mobileNumber+' ?',
        [
           {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
           {text: 'OK', onPress: () => forwardSms()},
        ],
        { cancelable: false }
       );
   

    } else {
      console.log('SMS permission denied');
    }
  }

  async function forwardSms(){
    try {
      setDisabled(true);
      for (let i = 1; i <= count; i++) {
        DirectSms.sendDirectSms(mobileNumber, bodyText);
        console.log('sending [' + i + ']');
      }
      confirmSent();
    } catch (err) {
      console.warn(err);
    }
  }


  async function confirmSent() {
    Alert.alert(
      'Info',
      count + ' Messages forwarded..',
      [{text: 'OK', onPress: () =>  setDisabled(false)}],
      {
        cancelable: true,
      },
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleText}>txtLoop</Text>
        <Text style={styles.titleTextsmall}>Enter Mobile Number</Text>

        <TextInput
          value={mobileNumber}
          onChangeText={mobileNumber => setMobileNumber(mobileNumber)}
          placeholder={'Enter Conatct Number to Message'}
          keyboardType="numeric"
          style={styles.textInput}
          maxLength={6}
        />

        <Text style={styles.titleTextsmall}>Enter SMS body</Text>
        <TextInput
          value={bodyText}
          onChangeText={bodyText => setBodyText(bodyText)}
          placeholder={'Enter SMS body. ex. Hello!'}
          style={styles.textInput}
        />

        <Text style={styles.titleTextsmall}>Count</Text>
        <TextInput
          value={count}
          keyboardType="numeric"
          onChangeText={count => setCount(count)}
          placeholder={'Enter SMS Count'}
          style={styles.textInput}
          maxLength={2}
        />

        <TouchableOpacity
          activeOpacity={!disabled ? 0.5 : 1}
          style={styles.buttonStyle}
          onPress={() => !disabled && sendDirectSms()}>
          <Text style={styles.buttonTextStyle}>Send Message</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ShortMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleTextsmall: {
    marginVertical: 8,
    fontSize: 16,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#3364FF',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});
