import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  List,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TripList from './TripList';
import {Context as LocationContext} from '../../context/locationContext';
import {Context as BusContext} from '../../context/busContext';
import {Context as TripContext} from '../../context/tripContext';
import {Context as UserContext} from '../../context/userContext';
import {NavigationEvents} from 'react-navigation';
import {Spacer0} from '../components/Spacer';
import {Form, TextInput} from '../../helper/react-native-autofocus';
import {Picker} from '@react-native-community/picker';
import {ActivityIndicator, Button, Snackbar} from 'react-native-paper';
import {Context} from '../../context/userContext';

const AddTrip = ({navigation}) => {
  const {
    state: tripState,
    addTrip,
    add_error,
    clear_error_message,
  } = useContext(TripContext);
  const {state: locationState, getLocationList} = useContext(LocationContext);
  const {state: busState, getBus} = useContext(BusContext);
  const {state: userState, getDriverList} = useContext(Context);

  useEffect(() => {
    getLocationList();
    // const listiner = navigation.addListener('willFocus', async () => {
    //   await getLocationList();
    // });
  }, []);
  const listiner = navigation.addListener('willFocus', async () => {
    await getLocationList();
  });

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
      addTrip(data);
      setSnack(true);
      setLoader(false);
      // setSnack(false);
    }
  };
  const ddd = locationState.location;
  const [loader, setLoader] = useState(false);
  const [snack, setSnack] = useState(false);

  const loadUserTypes = () => {
    return array.map((user) => (
      <Picker.Item label={user.locationName} value={user.id} />
    ));
  };
  const {selectedUserType, setSelectedUserType} = useState({name: ''});

  return (
    <View
      style={{
        // marginTop: 100,
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      {/*</List>*/}
      <Text>sd</Text>
      <Button>Start to get location in background and store</Button>
      <Button>stop to get location </Button>
      {locationState.location &&
        // const list =
        (() => {
          return locationState.location.map((element) => {
            return (
              <View style={{margin: 10}}>
                <Text>{element.locationName}</Text>
                <Text>{element.createAt}</Text>
              </View>
            );
          });
        })}
      <Text>{JSON.stringify(tripState)}</Text>
      <Text>{JSON.stringify(locationState)}</Text>
      <NavigationEvents onWillBlur={clear_error_message} />

      <>
        <Spacer0 />
        <View style={styles.container}>
          <Form>

            <FlatList
              data={locationState.location}
              renderItem={({item}) => <Text>{item.locationName}</Text>}
              keyExtractor={(item) => item.id}
            />
            <View
              style={{
                borderColor: 'grey',
                borderWidth: 1,
                borderRadius: 5,
                backgroundColor: '#ffffff10',
                marginTop: 10,
              }}>
              <Picker
                selectedValue={data.bloodType}
                style={{
                  height: 50,
                  width: '100%',
                  margin: 2,
                  color: '#00000090',
                }}
                onValueChange={(itemValue, itemIndex) =>
                  setData({...data, bloodType: itemValue})
                }>
                {/*{Array.map((item) => (*/}
                {/*  <Picker.Item label="O positive" value="O+" />*/}
                {/*))}*/}
                <Picker.Item label="colombo" value="O-" />
                <Picker.Item label="kandy" value="O-" />
              </Picker>
            </View>
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
          {/*{state.errorMessage}*/}
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
AddTrip.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Add Trip',
  };
};

export default AddTrip;
