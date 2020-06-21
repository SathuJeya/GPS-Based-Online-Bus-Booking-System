import React, {useContext, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Button, Card, Paragraph} from 'react-native-paper';
import {Context} from '../../context/ticketContext';
import AsyncStorage from '@react-native-community/async-storage';

const MyTrip = ({navigation}) => {
  const {state, getTicektList} = useContext(Context);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('ID');
      await console.log(value);
      await getTicektList(value);

      const listiner = navigation.addListener('didFocus', async () => {
        await getTicektList(value);
      });
    })();
  }, []);

  return (
    <View>
      <FlatList
        data={state.ticket}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('TripDetail', {TripId: item.trip._id})
            }>
            <Card style={{marginVertical: 7, marginHorizontal: 12}}>
              {item.trip && (
                <Card.Content>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <Button style={{flex: 1}}>
                      {item.trip.from.locationName}
                    </Button>

                    <Button style={{flex: 1}}>To</Button>

                    <Button style={{flex: 1}}>
                      {item.trip.to.locationName}
                    </Button>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignSelf: 'center',
                    }}>
                    <Paragraph style={{flex: 1}}>
                      {item.trip.bus.busName}
                    </Paragraph>
                    <Paragraph style={{flex: 1}}>
                      {item.trip.bus.busNumber}
                    </Paragraph>
                    <Paragraph style={{flex: 1}}>
                      {item.trip.bus.type}
                    </Paragraph>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      alignSelf: 'center',
                    }}>
                    <Paragraph style={{flex: 1}}>{item.date}</Paragraph>
                  </View>
                </Card.Content>
              )}
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MyTrip;
