import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Link, Route, withRouter } from 'react-router-dom';
import Counter from '../Counter';
import Github from '../Github';
import Books from '../Books';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">Books</Link> | <Link to="/github">Github</Link> |{' '}
          <Link to="/counter">Counter</Link>
        </div>
        <Switch>
          <Route exact path="/" component={Books} />
          <Route exact path="/github" component={Github} />
          <Route exact path="/counter" component={Counter} />

          {/* Finally, catch all unmatched routes */}
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
