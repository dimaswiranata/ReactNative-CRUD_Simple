import React, { useState } from 'react'
import Router from "./router";
import FlashMessage from "react-native-flash-message";
import { Provider, useSelector } from "react-redux";
import { Loading } from "./component";
import store from "./redux/store";

const AppContainer = () => {
  const [loading, setLoading] = useState(false);
  const stateGlobal = useSelector(state => state);
  return (
    <>
      <Router/>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading/>}
    </>
  )
}

const App = () => {
  return (
    <>
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    </>
  )
}

export default App;
