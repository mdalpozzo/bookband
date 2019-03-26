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
      userType: '',
      errors: {
        register: {}
      }
    };
  }

  // componentDidMount() {
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard');
  //   }
  // }

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
      userType: this.props.regType
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: '* Select Status', value: 0 },
      { label: 'host', value: 'host' },
      { label: 'artist', value: 'artist' }
    ];

    const headline = `${this.props.regType
      .charAt(0)
      .toUpperCase()}${this.props.regType.slice(1)} Sign Up`;

    return (
      <div className="register">
        <div className="container-fluid">
          <div className="row">
            <div className="container-fluid register-inner">
              <div className="col-lg-6 main-input">
                <h1 className="display-4 text-center">{headline}</h1>
                <p className="lead text-center">
                  Create your {this.props.regType} account!
                </p>
                <form
                  noValidate
                  onSubmit={this.onSubmit}
                  tabIndex={this.props.regTabIndex}
                >
                  <TextFieldGroup
                    placeholder="Name"
                    className={classnames('form-control', {
                      'is-invalid': errors.register.name
                    })}
                    name="name"
                    type="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.register.name}
                    tabIndex={this.props.regTabIndex}
                  />
                  {errors.register.name && (
                    <div className="invalid-feedback">
                      {errors.register.name}
                    </div>
                  )}
                  <TextFieldGroup
                    placeholder="Email address"
                    className={classnames('form-control', {
                      'is-invalid': errors.register.email
                    })}
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.register.email}
                    info=""
                    tabIndex={this.props.regTabIndex}
                  />
                  {errors.register.email && (
                    <div className="invalid-feedback">
                      {errors.register.email}
                    </div>
                  )}
                  <TextFieldGroup
                    placeholder="Password"
                    className={classnames('form-control', {
                      'is-invalid': errors.register.password
                    })}
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.register.password}
                    tabIndex={this.props.regTabIndex}
                  />
                  {errors.register.password && (
                    <div className="invalid-feedback">
                      {errors.register.password}
                    </div>
                  )}
                  <TextFieldGroup
                    placeholder="Confirm password"
                    className={classnames('form-control', {
                      'is-invalid': errors.register.password2
                    })}
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.register.password2}
                    tabIndex={this.props.regTabIndex}
                  />
                  {errors.register.password2 && (
                    <div className="invalid-feedback">
                      {errors.register.password2}
                    </div>
                  )}
                  {/* <SelectListGroup
                    placeholder="userType"
                    name="userType"
                    value={this.props.regType}
                    options={options}
                    error={errors.userType}
                    info="Are you an artist/performer or a host/vendor?"
                    tabIndex={this.props.regTabIndex}
                  /> */}
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4 reg-submit"
                    tabIndex={this.props.regTabIndex}
                  />
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
    isAuthenticated: PropTypes.bool.isRequired
  }).isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
