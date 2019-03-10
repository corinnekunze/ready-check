import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import Groups from './views/Groups';

const AppRouter = () => (
  <React.Fragment>
    <NavBar />
    <Switch>
      <div className="center measure-wide f5 pv4 lh-copy ph2">
        <Route exact path="/">
          <Redirect to="/groups" />
        </Route>
        <Route exact path="/groups" component={Groups}></Route>
      </div>
    </Switch>
  </React.Fragment>
);

export default AppRouter;
