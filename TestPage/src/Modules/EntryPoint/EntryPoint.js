import React, { Fragment } from 'react'
import {Router, Route, Redirect, Switch} from 'react-router-dom'
import {createBrowserHistory} from 'history'
import DmmPage from './DmmPage/DmmPage'

import GlobalJson from '../../Global.json'


const RouterEntryPoint = () => {
  return (
    <Fragment>
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route exact path={GlobalJson.routerBaseName} component={DmmPage} />
          <Route exact path={GlobalJson.rootLink} render={() => (
            <Redirect to={GlobalJson.routerBaseName}/>
          )}/>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default RouterEntryPoint
