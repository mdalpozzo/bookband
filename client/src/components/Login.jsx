import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import TextFieldGroup from './common/TextFieldGroup.jsx';
import SelectListGroup from './common/SelectListGroup.jsx';

class ArtistProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // profile_id: this.props.location.state.profile_id || null,
      // profileType: this.props.location.state.profileType || '',
      email: '',
      password: '',
      userType: '',
      errors: {
        login: {}
      }
    };
  }

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
    // fetch profile by profile_id and type
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
      // <div className="login-form-container">
      //   <form className="login-form" onSubmit={this.onSubmit}>
      //     <TextFieldGroup
      //       placeholder="Email Address"
      //       name="email"
      //       type="email"
      //       className={classnames('form-control', {
      //         'is-invalid': errors.login.email
      //       })}
      //       value={this.state.email}
      //       onChange={this.onChange}
      //       error={errors.login.email}
      //     />
      //     {errors.login.email && (
      //       <div className="invalid-feedback">{errors.login.email}</div>
      //     )}
      //     <TextFieldGroup
      //       placeholder="Password"
      //       name="password"
      //       type="password"
      //       className={classnames('form-control', {
      //         'is-invalid': errors.login.password
      //       })}
      //       value={this.state.password}
      //       onChange={this.onChange}
      //       error={errors.login.password}
      //     />
      //     {errors.login.password && (
      //       <div className="invalid-feedback">{errors.login.password}</div>
      //     )}
      //     <SelectListGroup
      //       placeholder="userType"
      //       className={classnames('form-control', {
      //         'is-invalid': errors.login.userType
      //       })}
      //       name="userType"
      //       options={options}
      //       onChange={this.onChange}
      //       error={errors.login.userType}
      //     />
      //     {errors.login.userType && (
      //       <div className="invalid-feedback">{errors.login.userType}</div>
      //     )}
      //     <button type="Submit" value="Log In" className="btn login-button">
      //       Log In
      //     </button>
      //   </form>
      // </div>
      <div className="login-main">
        <h1>
          Your account has been created successfully! Please log in above.
        </h1>
      </div>
    );
  }
}

// Contact.propTypes = {
//   getProfileByTool: PropTypes.func.isRequired,
//   getAllLenders: PropTypes.func.isRequired,
//   // errors: PropTypes.object.isRequired,
// };

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistProfile);
