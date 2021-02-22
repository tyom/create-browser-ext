import React from 'react';
import { render } from 'react-dom';
import { Frame, InPagePanel } from './components';
import GlobalStyles from './GlobalStyles';

render(
  <Frame>
    <>
      <GlobalStyles />
      <InPagePanel />
    </>
  </Frame>,
  document.body.appendChild(document.createElement('div'))
);
