import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';
import {navigate} from '../routes/navigationRef';

const busReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'busList':
      return {...state, bus: action.payload};
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

const addBus = (dispatch) => {
  return async (data) => {
    const response = await jsonServer
      .post('/api/bus', {
        busName: data.busName,
        type: data.type,
        busNumber: data.busNumber,
      })
      .then(() => {
        dispatch({
          type: 'add_error',
          payload: 'success',
        });
        navigate('BusList');
      })
      .catch((err) =>
        dispatch({
          type: 'add_error',
          payload: 'Name And Bus number must unique',
        })
      );
    await getBusList();
  };
};

const getBusList = (dispatch) => {
  return async () => {
    const response = await jsonServer.get('/api/bus');
    await console.log(response.data);
    await dispatch({type: 'busList', payload: response.data});
  };
};

export const {Provider, Context} = createDataContext(
  busReducer,
  {
    add_error,
    clear_error_message,
    addBus,
    getBusList,
  },
  {},
);
