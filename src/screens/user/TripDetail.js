import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Context} from '../../context/tripContext';

const TripDetail = ({navigation}) => {
  const {state, getTripDetail} = useContext(Context);

  useEffect(() => {
    (async () => {
      await getTripDetail(navigation.getParam('TripId'));
      const listiner = navigation.addListener('didFocus', async () => {
        await getTripDetail(navigation.getParam('TripId'));
      });
    })();
  }, []);

  const [trip, setTrip] = useState(navigation.getParam('TripId'));
  return (
    <View>
      <Text>Trip Id{trip}</Text>
      <Text>Trip detail{JSON.stringify(state.tripDetail)}</Text>
        <Text></Text>
        <Text> YOu can View  the live location here</Text>
    </View>
  );
};

export default TripDetail;
