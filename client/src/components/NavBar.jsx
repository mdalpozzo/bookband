import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      active: false,
      isHide: false,
    };
  }

  hideBar = () => {
    const { isHide } = this.state

    window.scrollY > this.prev ?
    !isHide && this.setState({ isHide: true })
    :
    isHide && this.setState({ isHide: false });

    this.prev = window.scrollY;
 }

  onClick = e => {
    if (document.body.className !== 'open') {
      document.body.className = 'open';
    } else {
      document.body.className = '';
    }
  };

  componentDidMount(){
    window.addEventListener('scroll', this.hideBar);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.hideBar);
  }

  render() {
    const classHide = this.state.isHide ? 'hide' : '';

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
            <li onClick={this.onClick}>
              <Link className="navlink" to="/contact">
                Login
              </Link>
            </li>
          </ul>
        </nav>
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
