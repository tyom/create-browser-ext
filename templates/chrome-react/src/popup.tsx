import React from 'react';
import { render } from 'react-dom';
import { Popup } from './components';
import GlobalStyles from './globalStyles';

render(
  <>
    <GlobalStyles />
    <Popup />
  </>,
  document.getElementById('root')
);
