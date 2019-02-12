import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Parallax, Background } from 'react-parallax';

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      mainpic: 'images/mic_lowres.jpg',
      highres: 'images/mic.jpg',
      firstloaded: false,
      secondpic: 'images/tape_lowres.jpg',
      highressecond: 'images/tape.jpg',
      secondloaded: false,
    };
  }

  componentDidMount() {
    const highresimg = new Image();
    const highresimg2 = new Image();

    highresimg2.onload = () => {
      this.setState({
        mainpic: this.state.highres,
        secondpic: this.state.highressecond,
      })
    }
  
    highresimg.onload = () => {
      highresimg2.src = this.state.highressecond;
    }
    highresimg.src = this.state.highres;
  }

  render() {
    return (
      <div className="landing">
        <Parallax
            blur={0}
            bgImage={this.state.mainpic}
            bgImageAlt="microphone"
            strength={800}
        >
        <div className="parallax-mainpage">
          <div className="leads">
            <h1>Book Band</h1>
            <h2>Book your band/act or find talent for your venue</h2>
          </div>
        </div>
        </Parallax>
        <div className="banner">
          {/* <div className="leads">
            <h1>Book Band</h1>
            <h2>Book your band/act or find talent for your venue</h2>
          </div> */}
          <div className="artistorhost">
            <div id="artist">
              <p>are you an artist or group looking for gigs?</p>
              <button>See Venue/Vendor Listings</button>
              <button>Create Artist Account</button>
            </div>
            <div id="host">
              <p>are you a venue or event looking for awesome performers?</p>
              <button>See Performer Listings</button>
              <button>Create Vender Account</button>
            </div>
          </div>
          {/* <img className="mainpic" src={this.state.mainpic} /> */}
        </div>
        <Parallax
            blur={0}
            bgImage={this.state.secondpic}
            bgImageAlt="microphone"
            strength={400}
        >
        <div className="parallax-mainpage">
          <div className="leads">
            <h1>We connect talent with venues</h1>
            <h2>We'll get that demo in the right hands</h2>
          </div>
        </div>
        </Parallax>
        <div className="about-banner">
          <h2>We connect talent with parties!</h2>
          <div>blah blah</div>
          <div>blahbalhblah</div>
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
