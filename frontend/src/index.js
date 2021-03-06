import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth";



const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: authReducer,
});
const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

// const ApolloWrappedApp = () => {
//   return (
//     <ApolloProvider client={client}>
      
//     </ApolloProvider>
//   );
// };

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
