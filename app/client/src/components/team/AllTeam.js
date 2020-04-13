import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Team = (props) => (
  <tr>
    <td>
      <Link
        className="text-white"
        style={{ textDecoration: "none" }}
        to={"/team/" + props.team._id}
      >
        {props.team.name}
      </Link>
    </td>
    <td>{props.team.division}</td>
    <td>{props.team.value} $</td>
  </tr>
);

class AllTeam extends Component {
  constructor(props) {
    super(props);

    this.teamList = this.teamList.bind(this);

    this.state = {
      teams: [],
    };
  }

  componentDidMount() {
    axios
      .get("/api/team/")
      .then((response) => {
        this.setState({
          teams: response.data,
        });
      })
      .catch((err) => console.log(err));
  }

  teamList() {
    return this.state.teams.map((currentteam) => {
      return <Team team={currentteam} key={currentteam._id} />;
    });
  }

  render() {
    return (
      <div className="landing position-relative overflow-auto p-3 p-md-5 text-center bg-light">
        <div className="row mt-5">
          <div className="text-white mx-auto w-25 alignt-items-center">
            <div className="group">
              <h5>For more information, click on the team's name!</h5>
            </div>
          </div>
          <table className="doboz table mx-auto alignt-items-center text-white">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Division</th>
                <th scope="col">Value($)</th>
              </tr>
            </thead>
            <tbody>{this.teamList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AllTeam;
