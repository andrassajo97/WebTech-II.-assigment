import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Player = (props) => (
  <tr>
    <td>
      <Link
        className="text-white"
        style={{ textDecoration: "none" }}
        to={"player/" + props.player._id}
      >
        {props.player.name}
      </Link>
    </td>
    <td>{props.player.team}</td>
    <td>{props.player.goals}</td>
  </tr>
);

class AllPlayer extends Component {
  constructor(props) {
    super(props);

    this.playerList = this.playerList.bind(this);

    this.state = {
      players: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/player/")
      .then((response) => {
        this.setState({
          players: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  playerList() {
    return this.state.players.map((currentplayer) => {
      return <Player player={currentplayer} key={currentplayer._id} />;
    });
  }

  render() {
    return (
      <div className="landing position-relative overflow-auto p-3 p-md-5 text-center bg-light">
        <div className="row mt-5">
          <div className="text-white mx-auto w-25 alignt-items-center">
            <div className="group">
              <h5>For more information, click on the player's name!</h5>
            </div>
          </div>
          <table
            id="myTable"
            className="doboz table mx-auto alignt-items-center text-white"
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Club</th>
                <th scope="col">Goals scored</th>
              </tr>
            </thead>
            <tbody>{this.playerList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AllPlayer;
