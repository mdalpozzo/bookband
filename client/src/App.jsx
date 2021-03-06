import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';

import Landing from './components/Landing.jsx';
import NavBar from './components/NavBar.jsx';
import ArtistProfile from './components/ArtistProfile.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

import * as actions from './actions/actions';
import store from './store/store';

class App extends React.Component {
  componentWillMount() {}

  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className="main-wrapper">
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Route path="/artistprofile" component={ArtistProfile} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => state.stories;

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
