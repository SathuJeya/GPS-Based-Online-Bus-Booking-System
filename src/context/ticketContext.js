import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';
import {navigate} from '../routes/navigationRef';

const ticketReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return {...state, errorMessage: action.payload};
    case 'clear_error_message':
      return {...state, errorMessage: ''};
    case 'ticketList':
      return {...state, ticket: action.payload};
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

const addTicket = (dispatch) => {
  return async (trip, tripUser, status) => {
    const response = await jsonServer
      .post('/api/ticket', {
        trip: trip,
        tripUser: tripUser,
        status: status,
      })
      .then(() => {
        dispatch({
          type: 'add_error',
          payload: 'success',
        });
        navigate('MyTrip');
      })
      .catch((err) =>
        dispatch({
          type: 'add_error',
          payload: 'something wrong',
        }),
      );
  };
};

const getTicektList = (dispatch) => {
  return async (date) => {
    // alert(date)
    if (date) {
      const response = await jsonServer.get('/api/ticket');
      const filter = await response.data.filter(
        (data) => data.tripUser._id === date,
      );
      await dispatch({type: 'ticketList', payload: filter});
    } else {
      const response = await jsonServer.get('/api/ticket');
      await dispatch({type: 'ticketList', payload: response.data});
    }
  };
};

export const {Provider, Context} = createDataContext(
  ticketReducer,
  {
    add_error,
    clear_error_message,
    addTicket,
    getTicektList,
  },
  {},
);
