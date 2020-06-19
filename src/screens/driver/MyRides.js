import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Button, Card, Paragraph} from 'react-native-paper';
import {Context} from '../../context/tripContext';
import AsyncStorage from '@react-native-community/async-storage';

const MyRides = ({navigation}) => {
  const {state, getTripList} = useContext(Context);
  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('ID');
      await console.log({value});
      await getTripList(value);

      const listiner = navigation.addListener('didFocus', async () => {
        await getTripList(value);
      });
    })();
  }, []);

  return (
    <View>
      <FlatList
        data={state.trip}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('RideDetail', {TripId: item.id})}>
            <Card style={{marginVertical: 7, marginHorizontal: 12}}>
              <Card.Content>
                <View style={{flexDirection: 'row', flex: 1}}>
                  <Button style={{flex: 1}}>{item.from.locationName}</Button>
                  <Button style={{flex: 1}}>To</Button>
                  <Button style={{flex: 1}}> {item.to.locationName}</Button>
                </View>
                <View
                  style={{flexDirection: 'row', flex: 1, alignSelf: 'center'}}>
                  <Paragraph style={{flex: 1}}>{item.bus.busName}</Paragraph>
                  <Paragraph style={{flex: 1}}>{item.bus.busNumber}</Paragraph>
                  <Paragraph style={{flex: 1}}>{item.bus.type}</Paragraph>
                </View>
                <View
                  style={{flexDirection: 'row', flex: 1, alignSelf: 'center'}}>
                  <Paragraph style={{flex: 1}}>{item.date}</Paragraph>
                  <Paragraph style={{flex: 1}}>
                    {item.noOfSeat} seats available
                  </Paragraph>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MyRides;
