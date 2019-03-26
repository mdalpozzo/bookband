import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../actions/authActions';

import isEmpty from '../validation/is-empty';

import TextFieldGroup from './common/TextFieldGroup.jsx';
import SelectListGroup from './common/SelectListGroup.jsx';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      isHideNav: false,
      email: '',
      password: '',
      userType: '',
      errors: {
        login: {}
      }
    };
  }

  hideBar = () => {
    const { isHideNav } = this.state;

    window.scrollY > this.prev
      ? !isHideNav && this.setState({ isHideNav: true })
      : isHideNav && this.setState({ isHideNav: false });

    this.prev = window.scrollY;
  };

  onClick = e => {
    if (document.body.className !== 'open') {
      document.body.className = 'open';
    } else {
      document.body.className = '';
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
      userType: this.state.userType
    };

    this.props.loginUser(userData, this.props.history);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors
      });
    }
  }

  static getDerivedStatefromProps(props, state) {
    if (props.errors) {
      return { errors: props.errors };
    } else {
      return null;
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.hideBar);
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/artistDashboard');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.hideBar);
  }

  render() {
    const { errors } = this.state;
    const classHide = this.state.isHideNav ? 'hide-nav' : '';
    // Select options for status
    const options = [
      { label: '* artist or host?', value: 0 },
      { label: 'host', value: 'host' },
      { label: 'artist', value: 'artist' }
    ];

    return (
      <div className={`navbar-container ${classHide}`}>
        <div>
          <h1>
            <Link className="namelink" to="/">
              BandBook
            </Link>
          </h1>
        </div>
        <div className="button menu-toggle" onClick={this.onClick} />
        <nav>
          <a href="#" id="menu-icon" />
          <ul className="menu">
            {/* <li onClick={this.onClick}>
              <Link className="navlink" to="/">
                Home
              </Link>
            </li>
            <li onClick={this.onClick}>
              <Link className="navlink" to="/about">
                About
              </Link>
            </li>
            <li onClick={this.onClick}>
              <Link className="navlink" to="/work">
                Work
              </Link>
            </li> */}
          </ul>
        </nav>
        <div className="login-form-container">
          <form className="login-form" onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              className={classnames('form-control', {
                'is-invalid': errors.login.email
              })}
              value={this.state.email}
              onChange={this.onChange}
              error={errors.login.email}
            />
            {errors.login.email && (
              <div className="invalid-feedback">{errors.login.email}</div>
            )}
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              className={classnames('form-control', {
                'is-invalid': errors.login.password
              })}
              value={this.state.password}
              onChange={this.onChange}
              error={errors.login.password}
            />
            {errors.login.password && (
              <div className="invalid-feedback">{errors.login.password}</div>
            )}
            <SelectListGroup
              placeholder="userType"
              className={classnames('form-control', {
                'is-invalid': errors.login.userType
              })}
              name="userType"
              options={options}
              onChange={this.onChange}
              error={errors.login.userType}
            />
            {errors.login.userType && (
              <div className="invalid-feedback">{errors.login.userType}</div>
            )}
            <button type="Submit" value="Log In" className="btn login-button">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginUser }, dispatch);

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavBar));
