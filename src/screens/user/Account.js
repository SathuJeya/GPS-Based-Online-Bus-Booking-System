import React, {useContext, useEffect, useState, useMemo} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {ActivityIndicator, Button, Snackbar, Title} from 'react-native-paper';
import {Spacer, Spacer0, Spacer2} from '../components/Spacer';
import {Text, Card} from 'react-native-elements';
import {Context} from '../../context/userContext';
import AsyncStorage from '@react-native-community/async-storage';

const Account = ({navigation}) => {
  const {state, signin, clearErrorMessage, getUser, errorMessage} = useContext(
    Context
  );
  navigation.addListener('didFocus', () => {
    (async () => {
      const value = await AsyncStorage.getItem('ID');
      await navigation.addListener('willFocus', () => {
        // getBlogPost();
        console.log('asdsbdb');
        // getUser(value);
      });
      await console.log(value);
    })();
    // getBlogPost();
  });

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('ID');
      // await navigation.addListener('willFocus', () => {
      // getBlogPost();
      getUser(value);
      // });
      await console.log(value);
    })();
  }, []);

  const signOutAction = async () => {
    async () => await AsyncStorage.remove('token');
    await navigation.navigate('loginFlow');
    console.log(navigation);
  };
  // const {email1,age1,name1}=state.user;
  return (
    <>
      <View style={styles.container}>
        {/*<Button onPress={_retrieveData}>SDssfds</Button>*/}
        {/*<Text>{JSON.stringify(state)}</Text>*/}
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Card title="Account Info">
            {state.user && (
              <View>
                <ListItem title="Name" detail={state.user.name} />
                <ListItem title="Email" detail={state.user.email} />
                <ListItem title="Age" detail={state.user.age} />
                <ListItem title="Blood Type" detail={state.user.bloodType} />
              </View>
            )}
          </Card>
        </View>
        <Spacer2 />
        <View>
          <Button
            style={{width: '80%', alignSelf: 'center'}}
            onPress={() => signOutAction()}
            mode="contained">
            Log Out
          </Button>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
    // height: '100%',
    // justifyContent: 'center',
  },
});

export default Account;
