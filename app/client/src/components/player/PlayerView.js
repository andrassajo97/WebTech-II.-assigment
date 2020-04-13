import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";

class PlayerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      post: "",
      birthDate: "",
      team: "",
      goals: "",
      mins: "",
      ycard: "",
      num: "",
      players: [],
    };
  }

  componentDidMount() {
    axios.get(`/api/player/${this.props.match.params.id}`).then((res) => {
      this.setState({
        name: res.data.name,
        birthDate: res.data.birthDate,
        team: res.data.team,
        post: res.data.post,
        goals: res.data.goals,
        mins: res.data.mins,
        ycard: res.data.ycard,
        num: res.data.num,
      });
    });

    axios
      .get("/api/player/")
      .then((response) => {
        this.setState({
          players: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  deletePlayer(id) {
    axios
      .delete(`/api/player/delete/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res.data);
      });

    this.setState = {
      teams: this.state.players.filter((el) => el._id !== id),
    };

    window.location = "/players";
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
                  <h3>Post</h3>
                </th>
              </tr>
              <tr>
                <th scope="col">{this.state.name}</th>
                <th scope="col">{this.state.post}</th>
              </tr>
              <tr className="bg-dark">
                <th scope="col">
                  <h3>Date of Birth</h3>
                </th>
                <th scope="col">
                  <h3>Team</h3>
                </th>
              </tr>
              <tr>
                <th scope="col">{this.state.birthDate}</th>
                <th scope="col">{this.state.team}</th>
              </tr>
              <tr className="bg-dark">
                <th scope="col">
                  <h3>Goals</h3>
                </th>
                <th scope="col">
                  <h3>2 min penalties</h3>
                </th>
              </tr>
              <tr>
                <th scope="col">{this.state.goals}</th>
                <th scope="col">{this.state.mins}</th>
              </tr>
              <tr className="bg-dark">
                <th scope="col">
                  <h3>Yellow cards</h3>
                </th>
                <th scope="col">
                  <h3>Number</h3>
                </th>
              </tr>
              <tr>
                <th scope="col">{this.state.ycard}</th>
                <th scope="col">{this.state.num}</th>
              </tr>
            </thead>
          </table>
          <button className="btn bg-white btn-lg m-3">
            <Link
              style={{ textDecoration: "none" }}
              to={`/player/edit/${this.props.match.params.id}`}
            >
              Edit
            </Link>
          </button>
          <button
            className="btn bg-white btn-lg m-3"
            onClick={() => this.deletePlayer(`${this.props.match.params.id}`)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(PlayerView);
