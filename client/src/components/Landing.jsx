import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Parallax, Background } from 'react-parallax';

import Register from './auth/Register.jsx';

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
      isHideBannerLeft: false,
      isHideBannerRight: false,
      isHideArtistReg: true,
      isHideHostReg: true,
      regType: '',
      bannerButtonsDisabled: false,
      artistRegTabIndex: -1,
      hostRegTabIndex: -1,
      bannerTabIndex: null
    };
  }

  onClickArtistReg = () => {
    this.setState({
      isHideBannerRight: true,
      isHideArtistReg: false,
      regType: 'artist',
      bannerButtonsDisabled: true,
      bannerTabIndex: -1,
      artistRegTabIndex: null
    });
  };

  onClickHostReg = () => {
    this.setState({
      isHideBannerLeft: true,
      isHideHostReg: false,
      regType: 'host',
      bannerButtonsDisabled: true,
      bannerTabIndex: -1,
      hostRegTabIndex: null
    });
  };

  closeReg = () => {
    this.setState({
      isHideBannerLeft: false,
      isHideBannerRight: false,
      isHideArtistReg: true,
      isHideHostReg: true,
      regType: '',
      bannerButtonsDisabled: false,
      artistRegTabIndex: -1,
      hostRegTabIndex: -1,
      bannerTabIndex: null
    });
  };

  componentDidMount() {
    const highresimg = new Image();
    const highresimg2 = new Image();

    highresimg2.onload = () => {
      this.setState({
        mainpic: this.state.highres,
        secondpic: this.state.highressecond
      });
    };

    highresimg.onload = () => {
      highresimg2.src = this.state.highressecond;
    };
    highresimg.src = this.state.highres;
  }

  render() {
    let classHideBanner = '';
    if (this.state.isHideBannerLeft) {
      classHideBanner = 'hide-banner-left';
    } else if (this.state.isHideBannerRight) {
      classHideBanner = 'hide-banner-right';
    }
    const classHideArtistReg = this.state.isHideArtistReg
      ? 'hide-artist-reg'
      : '';
    const classHideHostReg = this.state.isHideHostReg ? 'hide-host-reg' : '';

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
        <div className="non-parallax-mainpage banner">
          <div className="leads">
            <h1>Book Band</h1>
            <h2>Book your band/act or find talent for your venue</h2>
          </div>
          <img className="mainpic" src={this.state.mainpic} />
        </div>
        <div className="banner">
          <div
            className={`artistorhost ${classHideBanner}`}
            tabIndex={this.state.bannerTabIndex}
          >
            <div id="artist">
              <p>are you an artist or group looking for gigs?</p>
              <button
                onClick={this.onClickArtistReg}
                disabled={this.state.bannerButtonsDisabled}
                tabIndex={this.state.bannerTabIndex}
              >
                Artist/Performer Sign Up
              </button>
              <span>or</span>
              <button
                disabled={this.state.bannerButtonsDisabled}
                tabIndex={this.state.bannerTabIndex}
              >
                See Venue/Vendor Listings
              </button>
            </div>
            <div id="host">
              <p>are you a venue or event looking for awesome performers?</p>
              <button
                onClick={this.onClickHostReg}
                disabled={this.state.bannerButtonsDisabled}
                tabIndex={this.state.bannerTabIndex}
              >
                Vendor Sign Up
              </button>
              <span>or</span>
              <button
                disabled={this.state.bannerButtonsDisabled}
                tabIndex={this.state.bannerTabIndex}
              >
                See Performer Listings
              </button>
            </div>
          </div>
          <div className={`artist-reg ${classHideArtistReg}`}>
            <button
              className="btn btn-info reg-back-button"
              onClick={this.closeReg}
              tabIndex={this.state.artistRegTabIndex}
            >
              Go Back
            </button>
            <Register
              regType={this.state.regType}
              regTabIndex={this.state.artistRegTabIndex}
            />
          </div>
          <div className={`host-reg ${classHideHostReg}`}>
            <button
              className="btn btn-info reg-back-button"
              onClick={this.closeReg}
              tabIndex={this.state.hostRegTabIndex}
            >
              Go Back
            </button>
            <Register
              regType={this.state.regType}
              regTabIndex={this.state.hostRegTabIndex}
            />
          </div>
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
        <div className="non-parallax-mainpage banner">
          <div className="leads">
            <h1>We connect talent with venues</h1>
            <h2>We'll get that demo in the right hands</h2>
          </div>
          <img className="mainpic" src={this.state.secondpic} />
        </div>
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
