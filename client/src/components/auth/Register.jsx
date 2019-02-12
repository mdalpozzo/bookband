import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup.jsx';
import SelectListGroup from '../common/SelectListGroup.jsx';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

     // Select options for status
    const options = [
      { label: '* Select Status', value: 0 },
      { label: 'host', value: 'host' },
      { label: 'artist', value: 'artist' },
    ];

    return (
      <div className="register">
        <div className="container-fluid">
          <div className="row">
            <div className="container-fluid register-inner">
              <div className="col-lg-6 main-input">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your {this.props.regType} account!</p>
                <form noValidate onSubmit={this.onSubmit} tabIndex={this.props.regTabIndex}>
                  <TextFieldGroup
                    placeholder="Name"
                    name="name"
                    type="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                    tabIndex={this.props.regTabIndex}
                  />
                  <TextFieldGroup
                    placeholder="Email address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    info=""
                    tabIndex={this.props.regTabIndex}
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                    tabIndex={this.props.regTabIndex}
                  />
                  <TextFieldGroup
                    placeholder="Confirm password"
                    name="password2"
                    type="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                    tabIndex={this.props.regTabIndex}
                  />
                  <SelectListGroup
                  placeholder="userType"
                  name="userType"
                  // value={this.props.regType}
                  defaultValue={this.props.regType}
                  options={options}
                  error={errors.userType}
                  info="Are you an artist/performer or a host/vendor?"
                  tabIndex={this.props.regTabIndex}
                />
                  <input type="submit" className="btn btn-info btn-block mt-4" tabIndex={this.props.regTabIndex} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerUser,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
