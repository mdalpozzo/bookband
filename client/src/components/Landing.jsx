import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      mainpic: 'images/guitarguy_lowres.png',
      highres: 'images/guitarguy.jpg',
    };
  }

  componentWillMount() {
    const highresimg = new Image();
    highresimg.onload = () => {
      this.setState({
        mainpic: this.state.highres,
      })
    }
    highresimg.src = this.state.highres;
  }

  render() {
    return (
      <div className="landing">
        <div className="banner">
          <div className="leads">
            <h1>Book Band</h1>
            <h2>Book your band/act or find talent for your venue</h2>
          </div>
          <img className="mainpic" src={this.state.mainpic} />
        </div>
        <div className="attributes">
        
        </div>
      </div>
    );
  }
}

// Landing.propTypes = {
//   getProfileByTool: PropTypes.func.isRequired,
//   getAllLenders: PropTypes.func.isRequired,
//   // errors: PropTypes.object.isRequired,
// };

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
