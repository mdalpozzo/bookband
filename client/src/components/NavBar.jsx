import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TextFieldGroup from './common/TextFieldGroup.jsx';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      isHideNav: false,
      email: '',
      password: '',
      errors: {},
    };
  };

  hideBar = () => {
    const { isHideNav } = this.state

    window.scrollY > this.prev ?
    !isHideNav && this.setState({ isHideNav: true })
    :
    isHideNav && this.setState({ isHideNav: false });

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
    };

    this.props.loginUser(userData);
  };

  componentDidMount(){
    window.addEventListener('scroll', this.hideBar);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.hideBar);
  }

  render() {
    const classHide = this.state.isHideNav ? 'hide-nav' : '';

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
            <li onClick={this.onClick}>
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
            </li>
          </ul>
        </nav>
        <div className="login-form-container">
          <form className="login-form" onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Email Address"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              // error={errors.email}
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              // error={errors.password}
            />
            <button type="Submit" value="Log In" className="btn login-button">Log In</button>
          </form>
        </div>
      </div>
    );
  }
}

// NavBar.propTypes = {
//   getProfileByTool: PropTypes.func.isRequired,
//   getAllLenders: PropTypes.func.isRequired,
//   // errors: PropTypes.object.isRequired,
// };

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
