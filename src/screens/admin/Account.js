import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator, Button } from 'react-native-paper';
import {Spacer2} from '../components/Spacer';
import {Card} from 'react-native-elements';
import ListItem from '../components/ListItem';
import {Context} from '../../context/userContext';
import AsyncStorage from '@react-native-community/async-storage';

const Account = ({navigation}) => {
  const {state, getUser, errorMessage} = useContext(
    Context,
  );

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('ID');
      getUser(value);
    })();
  }, []);

  const signOutAction = async () => {
    async () => await AsyncStorage.remove('token');
    await navigation.navigate('loginFlow');
    console.log(navigation);
  };
  return (
    <>
      <View style={styles.container}>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Card title="Account Info">
            {state.user && (
              <View>
                <ListItem title="Name" detail={state.user.name} />
                <ListItem title="Email" detail={state.user.email} />
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
