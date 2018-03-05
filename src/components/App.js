import React, { Component, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom';

import LinkList from './LinkList'
import CreateLink from './CreateLinks';
import Header from './Header';
import Login from './Login';
import Search from './Search';

class App extends Component {
  render() {
    return <Fragment>
      <div className="center w85">
        <Header />
        <div className="ph3 pv1 background-gray">
          <Switch>
            <Route exact path="/" component={LinkList} />
            <Route exact path="/create" component={CreateLink} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </div>
      </div>
    </Fragment>
  }
}

export default App;
