import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { paths } from './constants';
import { Download, Files, Login } from './components';
import StyledApp from './App.style';

const App = () => (
  <StyledApp>
    <Switch>
      <Route path={paths.REGISTER} render={() => <Login register />} />
      <Route path={paths.LOGIN} component={Login} />
      <Route path={paths.DOWNLOAD} component={Download} />
      <Route exact path={paths.FILES} component={Files} />
    </Switch>
  </StyledApp>
);

export default App;
