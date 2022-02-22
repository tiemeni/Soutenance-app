import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk'
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000"
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
let composer = compose(applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

let store = createStore(
  reducers, composer
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider >
  ,
  document.getElementById('root')
);
