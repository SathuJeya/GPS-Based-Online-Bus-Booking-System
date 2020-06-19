import {createStackNavigator} from 'react-navigation-stack';
// import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// import {createAppContainer} from '@react-navigation/native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';

import AuthLoading from '../screens/auth/AuthLoading';

import ResolveAuthScreen from './ResolveAuthScreen';

import AddBus from '../screens/admin/AddBus';
import AddDriver from '../screens/admin/AddDriver';
import AddLocation from '../screens/admin/AddLocation';
import AddTrip from '../screens/admin/AddTrip';
import BusList from '../screens/admin/BusList';
import DriverList from '../screens/admin/DriverList';
import LocationList from '../screens/admin/LocationList';
import TripList from '../screens/admin/TripList';

import FindTrip from '../screens/user/FindTrip';
import MyTrip from '../screens/user/MyTrip';
import FindTripList from '../screens/user/FindTripList';

import Account from '../screens/admin/Account';
import React from 'react';

const iconSize = 24;

const tripInfo = createStackNavigator({
  TripList: {screen: TripList},
  AddTrip: {screen: AddTrip},
});
const findTripInfo = createStackNavigator({
  FindTrip: {screen: FindTrip},
  FindTripList: {screen: FindTripList},
});
const locationInfo = createStackNavigator({
  LocationList: {screen: LocationList},
  AddLocation: {screen: AddLocation},
});
const busInfo = createStackNavigator({
  BusList: {screen: BusList},
  AddBus: {screen: AddBus},
});
const driverInfo = createStackNavigator({
  DriverList: {screen: DriverList},
  AddDriver: {screen: AddDriver},
});
const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    loginFlow: createStackNavigator({
      SignIn: SignIn,
      SignUp: SignUp,
    }),

    adminFlow: createMaterialBottomTabNavigator(
      // createBottomTabNavigator
      {
        TripList: {
          screen: tripInfo,
          navigationOptions: {
            tabBarLabel: 'Trip',
            tabBarIcon: ({tintColor}) => (
              <Entypo name="flow-parallel" color={tintColor} size={iconSize} />
            ),
          },
        },
        LocationList: {
          screen: locationInfo,
          navigationOptions: {
            tabBarLabel: 'Location',
            tabBarIcon: ({tintColor}) => (
              <Entypo name="location-pin" color={tintColor} size={iconSize} />
            ),
          },
        },
        BusList: {
          screen: busInfo,
          navigationOptions: {
            tabBarLabel: 'Bus',
            tabBarIcon: ({tintColor}) => (
              <MaterialCommunityIcons
                name="bus"
                color={tintColor}
                size={iconSize}
              />
            ),
          },
        },
        DriverList: {
          screen: driverInfo,
          navigationOptions: {
            tabBarLabel: 'Driver',
            tabBarIcon: ({tintColor}) => (
              <FontAwesome5 name="user-tie" color={tintColor} size={iconSize} />
            ),
          },
        },
        Account: {
          screen: Account,
          navigationOptions: {
            tabBarLabel: 'Account',
            tabBarIcon: ({tintColor}) => (
              <MaterialCommunityIcons
                name="account"
                color={tintColor}
                size={iconSize}
              />
            ),
          },
        },
      },
      {
        initialRouteName: 'TripList',
        activeColor: '#f0edf6',
        inactiveColor: '#9f8de2',
        // barStyle: {backgsroundColor: '#694fad'},
      },
    ),
    userFlow: createMaterialBottomTabNavigator(
      // createBottomTabNavigator
      {
        FindTrip: {
          screen: findTripInfo,
          navigationOptions: {
            tabBarLabel: 'Find Trip',
            tabBarIcon: ({tintColor}) => (
              <Entypo name="flow-parallel" color={tintColor} size={iconSize} />
            ),
          },
        },
        MyTrip: {
          screen: MyTrip,
          navigationOptions: {
            tabBarLabel: 'My Trip',
            tabBarIcon: ({tintColor}) => (
              <FontAwesome5
                name="sort-amount-down"
                color={tintColor}
                size={iconSize}
              />
            ),
          },
        },

        Account: {
          screen: Account,
          navigationOptions: {
            tabBarLabel: 'Account',
            tabBarIcon: ({tintColor}) => (
              <MaterialCommunityIcons
                name="account"
                color={tintColor}
                size={iconSize}
              />
            ),
          },
        },
      },
      {
        initialRouteName: 'FindTrip',
        activeColor: '#f0edf6',
        inactiveColor: '#9f8de2',
        // barStyle: {backgsroundColor: '#694fad'},
      },
    ),
  },
  {
    // initialRouteName: 'loginFlow',
    defaultNavigationOptions: {
      title: 'Login',
    },
  },
);

const RouteNavigator = createAppContainer(switchNavigator);

export default RouteNavigator;
