import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Context as LocationContext} from '../../context/locationContext';
import {Context as BusContext} from '../../context/busContext';
import {Context as TripContext} from '../../context/tripContext';
import {Spacer0} from '../components/Spacer';
import {ActivityIndicator, Button, Snackbar} from 'react-native-paper';
import {Context} from '../../context/locationContext';
import ModalDropDown from '../components/ModalDropDown';

const AddTrip = ({navigation}) => {
  const {
    state: tripState,
    addTrip,
    add_error,
    clear_error_message,
  } = useContext(TripContext);

  const {state: locationState, getLocationList} = useContext(LocationContext);
  const {state: busState, getBus} = useContext(BusContext);
  const {state} = useContext(Context);

  const [data, setData] = useState({busName: '', type: '', busNumber: ''});
  const [modalVisible, setModalVisible] = useState(false);
  const [countrySelectedFlag, setCountrySelectedFlag] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loader, setLoader] = useState(false);
  const [snack, setSnack] = useState(false);

  useEffect(() => {
    getLocationList();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const setSelectedIndex1 = (item) => {
    setCountrySelectedFlag(true);
    setSelectedLocation(item.locationName);
    setModalVisible(false);
  };
  const setSelectedIndex2 = (item) => {
    setCountrySelectedFlag(true);
    setSelectedLocation(item.locationName);
    setModalVisible(false);
  };

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

  return (
    <View
      style={{
        // marginTop: 100,
        flex: 1,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <>
        <Spacer0 />
        <View style={styles.container}>
          <Spacer0 />

          <ModalDropDown
            lightMode={true}
            dataSource={state.location}
            modalVisible={modalVisible}
            selectedFlag={countrySelectedFlag}
            toggleModal={toggleModal}
            selectedValue={selectedLocation1}
            selecteLabel={'Select User'}
            setSelectedIndex={setSelectedIndex1}
          />

          <ModalDropDown
            lightMode={true}
            dataSource={state.location}
            modalVisible={modalVisible}
            selectedFlag={countrySelectedFlag}
            toggleModal={toggleModal}
            selectedValue={selectedLocation2}
            selecteLabel={'Select User'}
            setSelectedIndex={setSelectedIndex2}
          />

          {!loader ? (
            <Button onPress={() => addButtonAction()} mode="contained">
              Add
            </Button>
          ) : (
            <ActivityIndicator animating={true} />
          )}
        </View>
        {/* <Snackbar visible={snack} onDismiss={() => setSnack(false)}>
          {state.errorMessage}
        </Snackbar> */}
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
