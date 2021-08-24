import React, { useState } from 'react';
import {Route, Switch} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';



function App() {
  
  return (
    <Switch>
      <Route exact path="/" component={Homepage}/>
      <Route exact path="/login" component={Login}/>
    </Switch>
  );
}

export default App;
