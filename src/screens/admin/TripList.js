import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TripList = () => {
  return (
    <View>
      <Text>TripList</Text>
    </View>
  );
};

TripList.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Trip List',

    headerRight: () => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('AddTrip')
        }>
        <View style={{marginRight: 10}}>
          <Ionicons name="ios-add-circle" size={30} color="#651fff" />
        </View>
      </TouchableOpacity>
    ),
  };
};
export default TripList;
