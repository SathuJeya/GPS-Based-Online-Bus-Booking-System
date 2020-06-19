import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import DatePicker from 'react-native-datepicker';

const FindTrip = ({navigation}) => {
  const [date, setDate] = useState();

  return (
    <View>
      <Text style={{fontSize: 30, alignSelf: 'center', marginVertical: 30}}>
        FindTrip
      </Text>
      <Text style={{fontSize: 15, alignSelf: 'center', marginVertical: 10}}>
        SelectDate
      </Text>
      <DatePicker
        style={{width: 200, alignSelf: 'center'}}
        date={date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate={new Date(Date.now())}
        maxDate="2025-06-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {
          setDate(date);
        }}
      />
      <Text> {JSON.stringify(date)}</Text>
      <View style={{width: '50%', alignSelf: 'center', marginVertical: 40}}>
        <Button
          style={{width: 80}}
          title="Find"
          onPress={() => {
            date
              ? navigation.navigate('FindTripList', {date: date})
              : alert('Select Date');
          }}
        />
      </View>
    </View>
  );
};

export default FindTrip;
