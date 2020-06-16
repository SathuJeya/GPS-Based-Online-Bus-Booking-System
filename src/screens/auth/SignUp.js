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

const SignUp = ({navigation}) => {
  const {state, signup, clearErrorMessage, errorMessage} = useContext(Context);

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
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
      signup(data);
      errorMessage({error: 'Success'});
      setSnack(true);
    }
  };

  const [snack, setSnack] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: 20,
      }}>
      <NavigationEvents onWillBlur={clearErrorMessage} />
      <Text h3 style={{alignSelf: 'center'}}>
        Bus Booking System
      </Text>
      <Title style={{alignSelf: 'center', fontSize: 25}}> Sign Up</Title>
      <Spacer0 />
      <View>
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
          Register
        </Button>
        <Button onPress={() => navigation.navigate('SignIn')}>
          Already have an account? Sign in instend
        </Button>
        {/*<NavLink text="Already have an account?" routeName="SignIn" />*/}
      </View>
      <Snackbar
        visible={snack}
        onDismiss={() => setSnack(false)}
        action={{
          // label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        {state.errorMessage}
      </Snackbar>
    </View>
  );
};

SignUp.navigationOptions = ({navigation}) => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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

// SignUpScreen.navigationOptions = ({navigation}) => {
//     return {
//         headerShown: false,
//     };
// };

export default SignUp;
