import React from 'react';

import  {BrowserRouter,Switch,Route} from  'react-router-dom';
import  Principal from  './components/principal';
import  Signup from  './components/signup';
import  Signin from  './components/signin';
import  LayoutSign from  './components/layoutsign';
import  Profile from './components/profile';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        
        <Route exact path="/profile" component={Profile}/>
        <LayoutSign>
          <Route exact path="/" component={Principal}/>
          <Route exact path="/principal" component={Principal}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/signin" component={Signin}/>
        </LayoutSign>
        
      </Switch>
    </BrowserRouter>
  );
};
export default App;
