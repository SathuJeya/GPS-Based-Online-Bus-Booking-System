import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Context} from '../../context/tripContext';
import {Button, Card, Paragraph, Title, Snackbar} from 'react-native-paper';
import MapView from 'react-native-maps';
import jsonServer from '../../api/jsonServer';

const TripDetail = ({navigation}) => {
  const {state, getTripDetail} = useContext(Context);

  useEffect(() => {
    (async () => {
      // await getTripDetail(navigation.getParam('TripId'));
      // await console.log(navigation.getParam('TripId'));
      await setTrip(navigation.getParam('TripId'));
      const listiner = navigation.addListener('didFocus', async () => {
        await getTripDetail(navigation.getParam('TripId'));
      });
    })();
    setInterval(getDetail, 10000);
  }, []);

  const [trip, setTrip] = useState(navigation.getParam('TripId'));
  const getDetail = () => {
    console.log('getdeta');
    getTripDetail(trip);
    // GetMap
  };

  return (
    <View>
      {/*<Text>Trip Id{trip}</Text>*/}
      <View
        style={{
          height: 200,
          width: '100%',
          backgroundColor: 'white',
        }}>
        {/*<GetMap />*/}
        {state.tripDetail && (
          <Card.Content>
            <MapView
              // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={{height: '100%', width: '100%',marginTop:20}}
              mapType="standard"
              pitchEnabled={false}
              showsUserLocation={false}
              followsUserLocation={false}
              zoomControlEnabled={false}
              showsCompass={false}
              showsBuildings={false}
              // showsTraffic={true}
              initialRegion={{
                latitude: Number(`-${state.tripDetail.latitude}`),
                longitude: Number(state.tripDetail.longitude),
                latitudeDelta: 100,
                longitudeDelta: 100,
              }}>
              <MapView.Marker
                coordinate={{
                  latitude: Number(state.tripDetail.latitude),
                  longitude: Number(state.tripDetail.longitude),
                }}
                title="sdsadsa"
                description="asdsad"
              />
            </MapView>
          </Card.Content>
        )}
      </View>
    </View>
  );
};

export default TripDetail;
