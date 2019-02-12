import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ArtistListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile_id: null,
      profileType: '',
    };
  }

  render() {
    return (
      <div className="artistlistitem">
        <Link
          to={{
            pathname: "/artistprofile",
            state: { profile_id: this.state.profile_id, profileType: this.state.profileType }
          }}
        />
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
)(ArtistListItem);
