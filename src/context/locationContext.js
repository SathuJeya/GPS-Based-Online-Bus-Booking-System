import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';
import {navigate} from '../routes/navigationRef';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'locationList':
      return {...state, location: action.payload};
    default:
      return state;
  }
};

const add_error = (dispatch) => ({error}) => {
  dispatch({
    type: 'add_error',
    payload: error,
  });
};

const clear_error_message = (dispatch) => () => {
  dispatch({type: 'clear_error_message'});
};

const addLocation = (dispatch) => {
  return async (location) => {
    const response = await jsonServer
      .post('/api/location', {
        locationName: location,
      })
      .then(() => {
        dispatch({
          type: 'add_error',
          payload: 'success',
        });

        navigate('LocationList');
      })
      .catch((err) =>
        dispatch({
          type: 'add_error',
          payload: 'Location Must unique or something wrong',
        }),
      );
    await getLocationList();
  };
};

const getLocationList = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/api/location');
    await dispatch({type: 'locationList', payload: response.data});
  };
};

const getLocationListFilter = (dispatch) => {
  return async (name) => {
    const response = await jsonServer.get('/api/location');
    await dispatch({type: 'locationList', payload: response.data});
  };
};

export const {Provider, Context} = createDataContext(
  locationReducer,
  {
    add_error,
    clear_error_message,
    addLocation,
    getLocationList,
  },
  {},
);
