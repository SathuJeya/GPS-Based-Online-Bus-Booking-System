import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Context} from '../../context/busContext';
import {NavigationEvents} from 'react-navigation';

import {Text} from 'react-native-elements';
import {Spacer, Spacer0} from '../components/Spacer';
import {Button, Snackbar, ActivityIndicator} from 'react-native-paper';
import {Form, TextInput} from '../../../src/helper/react-native-autofocus';

const AddBus = ({navigation}) => {
  const {state, addBus, add_error, clear_error_message} = useContext(
    Context,
  );

  const [data, setData] = useState({busName: '', type: '', busNumber: ''});

  const addButtonAction = () => {
    if (data.busName === '') {
      add_error({error: 'Bus Name Required'});
      setSnack(true);
      console.log('ra');
    } else if (data.type === '') {
      add_error({error: 'Enter the bus Type'});
      setSnack(true);
      console.log('ra');
    } else if (data.busName === '') {
      add_error({error: 'Bus Number Required'});
      setSnack(true);
      console.log('ra');
    } else {
      setLoader(true);
      addBus(data);
      setSnack(true);
      setLoader(false);
      // setSnack(false);
    }
  };
  const [loader, setLoader] = useState(false);
  const [snack, setSnack] = useState(false);
  return (
    <View
      style={{
        // marginTop: 100,
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <NavigationEvents onWillBlur={clear_error_message} />

      <>
        <Spacer0 />
        <View style={styles.container}>
          <Form>
            <TextInput
              placeholder="Name"
              label="Name"
              onChangeText={(text) => setData({...data, busName: text})}
              value={data.busName}
              autoCapitalize="none"
              autoCorrect={false}
              mode="outlined"
            />
            <TextInput
              placeholder="Type"
              label="Type"
              onChangeText={(text) => setData({...data, type: text})}
              value={data.type}
              autoCapitalize="none"
              autoCorrect={false}
              mode="outlined"
            />
            <TextInput
              placeholder="Bus Number"
              label="Bus Number"
              onChangeText={(text) => setData({...data, busNumber: text})}
              value={data.busNumber}
              autoCapitalize="none"
              autoCorrect={false}
              mode="outlined"
            />
          </Form>
          <Spacer0 />
          {!loader ? (
            <Button onPress={() => addButtonAction()} mode="contained">
              Add
            </Button>
          ) : (
            <ActivityIndicator animating={true} />
          )}
        </View>
        <Snackbar visible={snack} onDismiss={() => setSnack(false)}>
          {state.errorMessage}
        </Snackbar>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
  },
  login: {
    height: '100%',
    justifyContent: 'center',
  },
});

AddBus.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Add Bus',
  };
};

export default AddBus;
