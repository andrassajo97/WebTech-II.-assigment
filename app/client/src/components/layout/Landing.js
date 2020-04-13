import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing position-relative overflow-auto p-3 p-md-5 text-center bg-light">
        <div className="text-right mx-auto my-5">
          <h1 className="display-4 font-weight-normal text-white">
            Handball-base
          </h1>
          <p className="lead font-weight-normal text-white">
            Add, edit and delete players or teams
          </p>
          <Link
            className="btn btn-lg btn-dark text-white"
            to="/register"
            role="button"
          >
            Register here &raquo;
          </Link>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(withRouter(Landing));
