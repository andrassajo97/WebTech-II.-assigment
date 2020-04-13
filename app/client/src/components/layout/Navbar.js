import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentUser } from "../../actions/userActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentUser();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown" style={{ cursor: "pointer" }}>
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-toggle="dropdown"
            >
              Players
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/players">
                List
              </Link>
              <Link className="dropdown-item" to="/addplayer">
                Add
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown" style={{ cursor: "pointer" }}>
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-toggle="dropdown"
            >
              Teams
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/teams">
                List
              </Link>
              <Link className="dropdown-item" to="/addteam">
                Add
              </Link>
            </div>
          </li>
        </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              to="#"
              onClick={this.onLogoutClick.bind(this)}
              className="nav-link"
            >
              Logout
            </Link>
          </li>
        </ul>
      </>
    );

    const guestLinks = (
      <>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item dropdown" style={{ cursor: "pointer" }}>
            <span
              className="nav-link dropdown-toggle disabled"
              role="button"
              data-toggle="dropdown"
            >
              Players
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/players">
                List
              </Link>
              <Link className="dropdown-item" to="/addplayer">
                Add
              </Link>
            </div>
          </li>
          <li className="nav-item dropdown" style={{ cursor: "pointer" }}>
            <span
              className="nav-link dropdown-toggle disabled"
              role="button"
              data-toggle="dropdown"
            >
              Teams
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link className="dropdown-item" to="/teams">
                List
              </Link>
              <Link className="dropdown-item" to="/addteam">
                Add
              </Link>
            </div>
          </li>
        </ul>

        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </>
    );

    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <Link className="navbar-brand" to="/">
          Handball-base
        </Link>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentUser })(
  withRouter(Navbar)
);
