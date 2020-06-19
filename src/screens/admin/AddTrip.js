import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TextInput, ScrollView} from 'react-native';
import {Context as LocationContext} from '../../context/locationContext';
import {Context as BusContext} from '../../context/busContext';
import {Context as TripContext} from '../../context/tripContext';
import {Context as UserContext} from '../../context/userContext';
import {Spacer, Spacer0} from '../components/Spacer';
import {ActivityIndicator, Button, Snackbar} from 'react-native-paper';
import {Context} from '../../context/tripContext';
import ModalDropDown from '../components/ModalDropDown';
import BusModalDropDown from '../components/BusModalDropDown';
import DriverModalDropDown from '../components/DriverModalDropDown';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-datepicker';
const AddTrip = ({navigation}) => {
  const {
    state: tripState,
    addTrip,
    add_error,
    clear_error_message,
  } = useContext(TripContext);

  const {state: locationState, getLocationList} = useContext(LocationContext);
  const {state: busState, getBusList} = useContext(BusContext);
  const {state: userState, getDriverList} = useContext(UserContext);
  // const {state} = useContext(Context);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [countrySelectedFlag, setCountrySelectedFlag] = useState(null);
  const [countrySelectedFlag2, setCountrySelectedFlag2] = useState(null);
  const [countrySelectedFlag3, setCountrySelectedFlag3] = useState(null);
  const [countrySelectedFlag4, setCountrySelectedFlag4] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocation2, setSelectedLocation2] = useState(null);
  const [selectedLocation3, setSelectedLocation3] = useState(null);
  const [selectedLocation4, setSelectedLocation4] = useState(null);
  const [loader, setLoader] = useState(false);
  const [snack, setSnack] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [seat, setSeat] = useState();
  const [data, setData] = useState({
    from: selectedLocation,
    to: selectedLocation2,
    driver: 'ffh',
    bus: selectedLocation3,
    noOfSeat: seat,
    date: date,
  });

  useEffect(() => {
    getLocationList();
    getBusList();
    getDriverList();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
  };
  const toggleModal3 = () => {
    setModalVisible3(!modalVisible3);
  };
  const toggleModal4 = () => {
    setModalVisible4(!modalVisible4);
  };

  const setSelectedIndex = (item) => {
    setCountrySelectedFlag(true);
    setSelectedLocation(item.locationName);
    setModalVisible(false);
  };
  const setSelectedIndex2 = (item) => {
    setCountrySelectedFlag2(true);
    setSelectedLocation2(item.locationName);
    setModalVisible2(false);
  };
  const setSelectedIndex3 = (item) => {
    setCountrySelectedFlag3(true);
    setSelectedLocation3(item.busName);
    setModalVisible3(false);
  };
  const setSelectedIndex4 = (item) => {
    setCountrySelectedFlag4(true);
    setSelectedLocation4(item.name);
    setModalVisible4(false);
  };

  const addButtonAction = () => {
    // alert(data.date);
    if (selectedLocation === '') {
      add_error({error: 'From Required'});
      setSnack(true);
    } else if (selectedLocation2 === '') {
      add_error({error: 'To Required'});
      setSnack(true);
    } else if (selectedLocation3 === '') {
      add_error({error: 'Bus Required'});
      setSnack(true);
    } else if (selectedLocation4 === '') {
      add_error({error: 'Bus Required'});
      setSnack(true);
    } else if (date === '') {
      add_error({error: 'Bus Required'});
      setSnack(true);
    } else if (seat === '') {
      add_error({error: 'Bus Required'});
      setSnack(true);
    } else {
      setLoader(true);
      addTrip(
        selectedLocation,
        selectedLocation2,
        selectedLocation4,
        selectedLocation3,
        seat,
        date,
      );
      setSnack(true);
      setLoader(false);
      // setSnack(false);
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          // marginTop: 100,
          flex: 1,
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <>
          <View style={styles.container}>
            <Spacer0 />
            <Text>Date</Text>
            <View>
              <DatePicker
                style={{width: 200}}
                date={date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate={new Date(Date.now())}
                maxDate="2025-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  setDate(date);
                }}
              />
            </View>
            <Spacer0 />
            <Text>From</Text>
            <ModalDropDown
              lightMode={true}
              dataSource={locationState.location}
              modalVisible={modalVisible}
              selectedFlag={countrySelectedFlag}
              toggleModal={toggleModal}
              selectedValue={selectedLocation}
              selecteLabel={'From'}
              setSelectedIndex={setSelectedIndex}
            />

            <Spacer0 />
            <Text>To</Text>
            <ModalDropDown
              lightMode={true}
              dataSource={locationState.location}
              modalVisible={modalVisible2}
              selectedFlag={countrySelectedFlag2}
              toggleModal={toggleModal2}
              selectedValue={selectedLocation2}
              selecteLabel={'To'}
              setSelectedIndex={setSelectedIndex2}
            />
            <Spacer0 />
            <Text>Bus</Text>
            <BusModalDropDown
              lightMode={true}
              dataSource={busState.bus}
              modalVisible={modalVisible3}
              selectedFlag={countrySelectedFlag3}
              toggleModal={toggleModal3}
              selectedValue={selectedLocation3}
              selecteLabel={'Select Bus'}
              setSelectedIndex={setSelectedIndex3}
            />
            <Spacer0 />
            <Text>Driver</Text>
            <DriverModalDropDown
              lightMode={true}
              dataSource={userState.driverList}
              modalVisible={modalVisible4}
              selectedFlag={countrySelectedFlag4}
              toggleModal={toggleModal4}
              selectedValue={selectedLocation4}
              selecteLabel={'Select Driver'}
              setSelectedIndex={setSelectedIndex4}
            />
            <Spacer0 />
            <Text>Number Of Seat</Text>
            <TextInput
              placeholder="Number of Seat"
              keyboardType={'number-pad'}
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'black',
                marginTop: 10,
              }}
              onChangeText={(text) => setSeat(text)}
            />
            <Spacer0 />
            {!loader ? (
              <Button onPress={() => addButtonAction()} mode="contained">
                Add
              </Button>
            ) : (
              <ActivityIndicator animating={true} />
            )}
            <Spacer0 />
          </View>
          <Snackbar visible={snack} onDismiss={() => setSnack(false)}>
            {tripState.errorMessage}
          </Snackbar>
        </>
      </View>
    </ScrollView>
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
