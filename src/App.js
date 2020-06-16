import React from 'react';

import {Provider as UserProvider} from './context/userContext';
import {Provider as LocationProvider} from './context/locationContext';
import {Provider as BusProvider} from './context/busContext';
import {Provider as TripProvider} from './context/tripContext';
import RouteNavigator from './routes/routes';
import {setNavigator} from './routes/navigationRef';

const App: () => React$Node = () => {
  return (
    <>
      <UserProvider>
        <TripProvider>
          <LocationProvider>
            <BusProvider>
              <RouteNavigator
                ref={(navigator) => {
                  setNavigator(navigator);
                }}
              />
            </BusProvider>
          </LocationProvider>
        </TripProvider>
      </UserProvider>
    </>
  );
};

export default App;
