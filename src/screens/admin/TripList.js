import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Context} from '../../context/tripContext';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const TripList = ({navigation}) => {
  const {state, getTripList} = useContext(Context);
  useEffect(() => {
    getTripList();
    const listiner = navigation.addListener('didFocus', async () => {
      await getTripList();
    });
  }, []);
  return (
    <View>
      <FlatList
        data={state.trip}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
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
                <View style={{flexDirection: 'row', flex: 1, alignSelf: 'center'}}>
                    <Paragraph style={{flex: 1}}>{item.date}</Paragraph>
                    <Paragraph style={{flex: 1}}>{item.noOfSeat} seats available</Paragraph>
                </View>
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};

TripList.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Trip List',

    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('AddTrip')}>
        <View style={{marginRight: 10}}>
          <Ionicons name="ios-add-circle" size={30} color="#651fff" />
        </View>
      </TouchableOpacity>
    ),
  };
};
export default TripList;
