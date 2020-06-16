import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Context} from '../../context/locationContext';
import {NavigationEvents} from 'react-navigation';

import {Spacer, Spacer0} from '../components/Spacer';
import {Button, Snackbar, ActivityIndicator} from 'react-native-paper';
import {Form, TextInput} from '../../../src/helper/react-native-autofocus';

const AddLocation = ({navigation}) => {
  const {state, addLocation, add_error, clear_error_message} = useContext(
    Context,
  );

  const [location, setLocation] = useState('');

  const addButtonAction = () => {
    if (location === '') {
      add_error({error: 'location Required'});
      setSnack(true);
      console.log('ra');
    } else {
      setLoader(true);
      addLocation(location);
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
              placeholder="Location"
              label="Location"
              onChangeText={(text) => setLocation(text)}
              value={location}
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

AddLocation.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Add Location',
  };
};

export default AddLocation;
