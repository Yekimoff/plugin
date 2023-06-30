import React from 'react';
import Widget from './components/Widget';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import {MainTheme} from './theme';
import store from './store/config';

export default function WidgetWrapper( props) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={MainTheme}>
        <Widget/>
      </ThemeProvider>
    </Provider>
  );
}