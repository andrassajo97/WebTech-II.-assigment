import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";

class TeamView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      division: "",
      address: "",
      phonenumber: "",
      webpage: "",
      teams: [],
    };
  }

  componentDidMount() {
    axios.get(`/api/team/${this.props.match.params.id}`).then((res) => {
      this.setState({
        name: res.data.name,
        division: res.data.division,
        address: res.data.address,
        phonenumber: res.data.phonenumber,
        webpage: res.data.webpage,
        value: res.data.value,
      });
    });

    axios
      .get("/api/team/")
      .then((response) => {
        this.setState({
          teams: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deleteTeam(id) {
    axios
      .delete(`/api/team/delete/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
      });

    this.setState = {
      teams: this.state.teams.filter((el) => el._id !== id),
    };

    window.location = "/teams";
  }

  render() {
    return (
      <div className="landing position-relative overflow-auto p-3 p-md-5 text-center bg-light">
        <div className="doboz mt-5 mx-auto w-50 text-white">
          <table className="doboz table table-bordered mx-auto alignt-items-center text-white">
            <thead>
              <tr className="bg-dark">
                <th className="w-50" scope="col">
                  <h3>Name</h3>
                </th>
                <th scope="col">
                  <h3>Division</h3>
                </th>
              </tr>
              <tr>
                <th scope="col">{this.state.name}</th>
                <th scope="col">{this.state.division}</th>
              </tr>
              <tr className="bg-dark">
                <th scope="col">
                  <h3>Address</h3>
                </th>
                <th scope="col">
                  <h3>Phone number</h3>
                </th>
              </tr>
              <tr>
                <th scope="col">{this.state.address}</th>
                <th scope="col">{this.state.phonenumber}</th>
              </tr>
              <tr className="bg-dark">
                <th scope="col">
                  <h3>Webpage</h3>
                </th>
                <th scope="col">
                  <h3>Value ($)</h3>
                </th>
              </tr>
              <tr>
                <th scope="col">{this.state.webpage}</th>
                <th scope="col">{this.state.value} $</th>
              </tr>
            </thead>
          </table>
          <button className="btn bg-white btn-lg m-3">
            <Link
              style={{ textDecoration: "none" }}
              to={`/team/edit/${this.props.match.params.id}`}
            >
              Edit
            </Link>
          </button>
          <button
            className="btn bg-white btn-lg m-3"
            onClick={() => this.deleteTeam(`${this.props.match.params.id}`)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(TeamView);
