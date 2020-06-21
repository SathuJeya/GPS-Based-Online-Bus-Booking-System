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
    case 'tripListDetail':
      return {...state, tripDetail: action.payload};
      case 'ticketListById':
          return {...state, ticketListById: action.payload};
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
  return async (
    selectedLocation,
    selectedLocation2,
    selectedLocation4,
    selectedLocation3,
    seat,
    date,
  ) => {
    const response = await jsonServer
      .post('/api/trip', {
        from: selectedLocation,
        to: selectedLocation2,
        driver: selectedLocation4,
        bus: selectedLocation3,
        noOfSeat: seat,
        date: date,
      })
      .then(() => {
        dispatch({
          type: 'add_error',
          payload: 'success',
        });
        navigate('TripList');
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

const updateTrip = (dispatch) => {
  return async (id, latitude, longitude) => {
    console.log({aaaaa: id});
    const response = await jsonServer
      .put(`/api/trip/${id}`, {
        latitude: latitude,
        longitude: longitude,
      })
      .then(() => {
        console.log('sdsdsd');
        console.log(response);
        // dispatch({
        //   type: 'add_error',
        //   payload: 'success',
        // });
      })
      .catch((err) =>
        dispatch({
          type: 'add_error',
          payload: 'something wrong',
        }),
      );
  };
};

const getTripList = (dispatch) => {
  return async (date) => {
    // alert(date)
    if (date) {
      const response = await jsonServer.get('/api/trip');
      const filter = await response.data.filter(
        (data) => data.driver._id === date,
      );
      await dispatch({type: 'tripList', payload: filter});
    } else {
      const response = await jsonServer.get('/api/trip');
      await dispatch({type: 'tripList', payload: response.data});
    }
  };
};

const getTripListByDate = (dispatch) => {
  return async (date) => {
    // alert(date)
    if (date) {
      const response = await jsonServer.get('/api/trip');
      const filter = await response.data.filter((data) => data.date === date);
      await dispatch({type: 'tripList', payload: filter});
    } else {
      const response = await jsonServer.get('/api/trip');
      await dispatch({type: 'tripList', payload: response.data});
    }
  };
};
const getAvailableSeat = (dispatch) => {
  return async (trip) => {
    // alert(date)
    await console.log('sd');
    const response = await jsonServer.get('/api/trip');
    // await console.log(response);
    // const filter = await response.data.filter((data) => data.date === trip);
    // await dispatch({type: 'tripList', payload: filter});
  };
};

const getTripDetail = (dispatch) => {
  return async (id) => {
    // alert(id);
    if (id) {
      const response = await jsonServer.get(`/api/trip/${id}`);
      // await console.log(response.data);
      await dispatch({type: 'tripListDetail', payload: response.data});
    } else {
      console.log('id not found');
    }
  };
};

const getTicketByTrip = (dispatch) => {
  return async (id) => {
    // alert(id);
    const response = await jsonServer.get(`/api/ticketByTrip/${id}`);
    // await console.log(response.data);
    await dispatch({type: 'ticketListById', payload: response.data});
  };
};

export const {Provider, Context} = createDataContext(
  tripReducer,
  {
    add_error,
    clear_error_message,
    addTrip,
    updateTrip,
    getTicketByTrip,
    getTripList,
    getTripDetail,
    getTripListByDate,
    getAvailableSeat,
  },
  {},
);
