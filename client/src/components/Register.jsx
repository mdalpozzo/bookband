import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ArtistProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // profile_id: this.props.location.state.profile_id || null,
      // profileType: this.props.location.state.profileType || '',
    };
  }

  componentDidMount() {
    // fetch profile by profile_id and type

  }

  render() {
    return (
      <div className="artistprofile">
        <h1>ARTIST PROFILE PAGE</h1>
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
