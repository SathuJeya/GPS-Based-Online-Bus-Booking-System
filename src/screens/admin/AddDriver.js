import React, {useContext, useState} from 'react';
import {StyleSheet, View, SafeAreaView, ScrollView} from 'react-native';
import {Context} from '../../context/userContext';
import AsyncStorage from '@react-native-community/async-storage';
import {Text} from 'react-native-elements';
import {Spacer, Spacer0} from '../components/Spacer';
import {
  Button,
  Title,
  Surface,
  Card,
  Checkbox,
  Switch,
  Snackbar,
} from 'react-native-paper';
import NavLink from '../../routes/NavLink';
import {Form, TextInput} from '../../../src/helper/react-native-autofocus';
import {NavigationEvents} from 'react-navigation';

const AddDriver = ({navigate}) => {
  const {state, driverRegister, clearErrorMessage, errorMessage} = useContext(
    Context,
  );

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'conductor',
  });

  const signupAction = () => {
    if (data.name === '') {
      errorMessage({error: 'Name Required'});
      setSnack(true);
    } else if (data.email === '') {
      errorMessage({error: 'Email Required'});
      setSnack(true);
    } else if (data.password === '') {
      errorMessage({error: 'Password Required'});
      setSnack(true);
    } else {
      driverRegister(data);
      errorMessage({error: 'Success'});
      setSnack(true);
    }
  };

  const [snack, setSnack] = useState(false);

  return (
    <>
      <View>
        <Text>sd</Text>
      </View>
      <View style={{marginHorizontal: 20, marginTop: 20}}>
        {/*<Spacer />*/}
        {/*{state.errorMessage ? <Text>{state.errorMessage}</Text> : null}*/}
        <Form>
          <TextInput
            placeholder="Name"
            // autoFocus={true}
            label="Name"
            onChangeText={(text) => setData({...data, name: text})}
            value={data.name}
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
          />
          <TextInput
            placeholder="Email"
            label="Email"
            onChangeText={(text) => setData({...data, email: text})}
            value={data.email}
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
          />
          <TextInput
            placeholder="Mobile"
            label="Mobile"
            onChangeText={(text) => setData({...data, phone: text})}
            value={data.phone}
            autoCapitalize="none"
            autoCorrect={false}
            mode="outlined"
          />
          <TextInput
            placeholder="Password"
            label="Password"
            onChangeText={(text) => setData({...data, password: text})}
            value={data.password}
            secureTextEntry
            mode="outlined"
          />
        </Form>

        <Spacer0 />
        <Button onPress={() => signupAction(data)} mode="contained">
          Add
        </Button>
      </View>
      <Snackbar visible={snack} onDismiss={() => setSnack(false)}>
        {state.errorMessage}
      </Snackbar>
    </>
  );
};
AddDriver.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Add Driver',
  };
};

export default AddDriver;
