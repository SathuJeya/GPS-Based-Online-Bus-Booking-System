import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Card, Paragraph, Title} from 'react-native-paper';
import {Context} from '../../context/userContext';

const DriverList = ({navigation}) => {
  const {state, getDriverList, clear_error_message} = useContext(Context);
  useEffect(() => {
    getDriverList();
    const listiner = navigation.addListener('didFocus', async () => {
      await getDriverList();
    });
  }, []);

  return (
    <View>

        {/*<Text>{JSON.stringify(state.driverList.data)}</Text>*/}
      <FlatList
        data={state.driverList}
        // keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Card style={{marginVertical: 7, marginHorizontal: 12}}>
            <Card.Content>
              <Title>Name: {item.email}</Title>
              <Paragraph>Vehicle Number: {item.name}</Paragraph>
              {/*<Paragraph>Type: {item.type}</Paragraph>*/}
            </Card.Content>
          </Card>
        )}
      />
    </View>
  );
};
DriverList.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'Driver List',
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('AddDriver')}>
        <View style={{marginRight: 10}}>
          <Ionicons name="ios-add-circle" size={30} color="#651fff" />
        </View>
      </TouchableOpacity>
    ),
  };
};

export default DriverList;
