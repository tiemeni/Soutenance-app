import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: "authType",
  storage: storage,
  whitelist: ["Favorite"], // which reducer want to store
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#f44336",
    },
  },
  typography: {
    fontFamily: ["Lato", "Montserrat"].join(","),
  },
});

let composer = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistedReducer = persistReducer(persistConfig, reducers);
let store = createStore(persistedReducer, composer);
const persistor = persistStore(store);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);
