import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Context} from '../../context/tripContext';
import Geolocation from '@react-native-community/geolocation';
import {Button,Card, Paragraph} from 'react-native-paper';

const RideDetail = ({navigation}) => {
  const {state, getTripDetail, updateTrip, getTicketByTrip} = useContext(
    Context,
  );
  const [trip, setTrip] = useState(navigation.getParam('TripId'));

  useEffect(() => {
    (async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );
      await getTicketByTrip(navigation.getParam('TripId'));
      await getTripDetail(navigation.getParam('TripId'));

      const listiner = navigation.addListener('didFocus', async () => {
        await getTripDetail(navigation.getParam('TripId'));
      });
    })();
    setInterval(getData, 10000);
  }, []);

  const getData = () => {
    Geolocation.getCurrentPosition(
      async (position) => {
        const currentLongitude = await JSON.stringify(
          position.coords.longitude,
        );
        await console.log(position);
        const currentLatitude = await JSON.stringify(position.coords.latitude);
        // console.log(currentLongitude);
        // console.log(currentLatitude)
        updateTrip(trip, currentLongitude, currentLatitude);
        // await setLatitude(currentLatitude);
        // await setLongitude(currentLongitude);
      },
      (error) => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 50000,
        maximumAge: 1000,
      },
    );
  };

  return (
    <View>
      <FlatList
        data={state.ticketListById}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Card style={{marginVertical: 7, marginHorizontal: 12}}>
            <Card.Content>
              <View style={{flexDirection: 'row', flex: 1}}>
                {item.tripUser && (
                  <Button style={{flex: 1}}>
                    {item.tripUser.email}
                  </Button>
                )}
                <Button style={{flex: 1}}>{item.tripUser.phone}</Button>
              </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

export default RideDetail;
