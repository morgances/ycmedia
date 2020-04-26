import React from 'react';

import dva from './patch/dva';
import Router from './router';
import { Models } from './models';
import { AppearanceProvider } from 'react-native-appearance';


const app = dva({
  initialState: {},
  models: Models,
  onError() {},
});

const application = app.start(
  <AppearanceProvider>
    <Router />
  </AppearanceProvider>
);

export default application;