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
import {Context} from '../../context/busContext';

const BusList = ({navigation}) => {
  const {state, getBusList, clear_error_message} = useContext(Context);
  useEffect(() => {
    getBusList();
    const listiner = navigation.addListener('didFocus', async () => {
      await getBusList();
    });
  }, []);

  return (
    <>
      <FlatList
        data={state.bus}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Card style={{marginVertical: 7, marginHorizontal: 12}}>
            <Card.Content>
              <Title>Name: {item.busName}</Title>
              <Paragraph>Vehicle Number: {item.busNumber}</Paragraph>
              <Paragraph>Type: {item.type}</Paragraph>
            </Card.Content>
          </Card>
        )}
      />
    </>
  );
};

BusList.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Bus List',

    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('AddBus')}>
        <View style={{marginRight: 10}}>
          <Ionicons name="ios-add-circle" size={30} color="#651fff" />
        </View>
      </TouchableOpacity>
    ),
  };
};

export default BusList;
