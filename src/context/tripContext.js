import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';
import {navigate} from '../routes/navigationRef';

const tripReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'tripList':
      return {...state, trip: action.payload};
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

const addTrip = (dispatch) => {
  return async (location) => {
    const response = await jsonServer
      .post('/api/trip', {
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
          payload: 'something wrong',
        }),
      );
    await getTripList();
  };
};

const getTripList = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/api/trip');
    await dispatch({type: 'locationList', payload: response.data});
  };
};

export const {Provider, Context} = createDataContext(
  tripReducer,
  {
    add_error,
    clear_error_message,
    addTrip,
    getTripList,
  },
  {},
);
