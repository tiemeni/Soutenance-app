import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './components/App.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000" // This is an orange looking color
    },
    secondary: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: [
      'Lato',
      'Montserrat',
    ].join(','),
  },
});

let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider >,
  document.getElementById('root')
);
