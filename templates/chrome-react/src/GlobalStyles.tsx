import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { GlobalStyles as TwinGlobalStyles } from 'twin.macro';

const GlobalCss = createGlobalStyle`
  /* global CSS */
`;

const GlobalStyles = () => (
  <>
    <TwinGlobalStyles />
    <GlobalCss />
  </>
);

export default GlobalStyles;
