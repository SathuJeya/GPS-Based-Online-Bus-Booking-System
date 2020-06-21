import React, {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Context} from '../../context/tripContext';
import {Context as UserContext} from '../../context/tripContext';
import {Context as TicketContext} from '../../context/ticketContext';
import {Button, Card, Paragraph} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const FindTripList = ({navigation}) => {
  const {state, getTripListByDate, getAvailableSeat} = useContext(Context);
  const {state: userState} = useContext(UserContext);
  const {state: ticketState, addTicket} = useContext(TicketContext);

  const [date, setDate] = useState(navigation.getParam('date'));
  useEffect(() => {
    getTripListByDate(date);
    const listiner = navigation.addListener('didFocus', async () => {
      await getTripListByDate(date);
    });
  }, []);
  if (state.trip == '') {
    return (
      <View style={{margin: 20}}>
        <Text>Trip Not Found in this search</Text>
      </View>
    );
  }

  const booking = (id) => {
    (async () => {
      const value = await AsyncStorage.getItem('ID');
      console.log(value);
      console.log(id);
      addTicket(id, value, 'booked');
    })();
  };
  return (
    <View>
      <FlatList
        data={state.trip}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              getAvailableSeat(item.id);
              Alert.alert(
                'Booking',
                'Do you confirm to book this trip',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => booking(item.id)},
                ],
                {cancelable: false},
              );
            }}>
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

export default FindTripList;
