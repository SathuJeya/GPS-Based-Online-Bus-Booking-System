import React, {useContext, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Button, Card, Paragraph, Text, Title} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Context} from '../../context/locationContext';

const LocationList = ({navigation}) => {
  const {state, getLocationList, clear_error_message} = useContext(Context);
  useEffect(() => {
    getLocationList();
    const listiner = navigation.addListener('didFocus', async () => {
      await getLocationList();
    });
  }, []);

  return (
    <>
      <FlatList
        data={state.location}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Card style={{marginVertical: 7, marginHorizontal: 12}}>
            <Card.Content>
              <Title>{item.locationName}</Title>
            </Card.Content>
          </Card>
        )}
      />
    </>
  );
};
LocationList.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Location List',
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('AddLocation')}>
        <View style={{marginRight: 10}}>
          <Ionicons name="ios-add-circle" size={30} color="#651fff" />
        </View>
      </TouchableOpacity>
    ),
  };
};

export default LocationList;
