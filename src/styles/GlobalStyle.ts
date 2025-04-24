import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: bold;
    src: url('/fonts/OpenSans-Bold.woff2') format('woff2'),
        url('/fonts/OpenSans-Bold.woff') format('woff');
    font-display: swap;
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 500;
    src: url('/fonts/OpenSans-Medium.woff2') format('woff2'),
        url('/fonts/OpenSans-Medium.woff') format('woff');
    font-display: swap;
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 300;
    src: url('/fonts/OpenSans-Light.woff2') format('woff2'),
        url('/fonts/OpenSans-Light.woff') format('woff');
    font-display: swap;
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: normal;
    src: url('/fonts/OpenSans-Regular.woff2') format('woff2'),
        url('/fonts/OpenSans-Regular.woff') format('woff');
    font-display: swap;
  }

  @font-face {
    font-family: 'Open Sans';
    font-style: italic;
    font-weight: normal;
    src: url('/fonts/OpenSans-Italic.woff2') format('woff2'),
        url('/fonts/OpenSans-Italic.woff') format('woff');
    font-display: swap;
  }
    
  :root {
    width: 100%;
    font-family: 'Open Sans', system-ui, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: #000000;
  }

  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    background-color: #ffffff;
  }
 
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    padding: 0;
    margin: 0;
  }

   #root {
    width: 100%;
  }


  button {
    font-family: inherit;
  }
`;

export default GlobalStyle;
