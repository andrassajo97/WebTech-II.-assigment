import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCurrentUser } from "../../actions/userActions";
import moment from "moment";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      currentDate: new Date(),
      markedDate: moment(new Date()).format("YYYY-MM-DD"),
    };
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { user } = this.props.auth;
    const { loading } = this.props.user;

    const today = this.state.currentDate;
    const day = moment(today).format("dddd");
    const date = moment(today).format("MMMM D, YYYY");

    let dashboardContent;

    if (user === null || loading) {
      dashboardContent = <h4>Loading...</h4>;
    } else {
      dashboardContent = (
        <div>
          <p className="display-4 float-right">Welcome, {user.username}!</p>
          <p className="display-4">{day}</p>
          <p className="display-4">{date}</p>
        </div>
      );
    }

    return (
      <div className="landing position-relative overflow-auto p-3 p-md-5 text-center bg-light">
        <div className="text-white p-5 float-right">{dashboardContent}</div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.user,
});

export default connect(mapStateToProps, { getCurrentUser })(
  withRouter(Dashboard)
);
