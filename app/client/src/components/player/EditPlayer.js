import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import classnames from "classnames";
import axios from "axios";

class EditPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      team: "",
      birthDate: "",
      post: "",
      goals: "",
      mins: "",
      ycard: "",
      num: "",
      teams: [],
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeTeam = this.onChangeTeam.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
      .get("/api/team/")
      .then((res) => {
        if (res.data.length > 0) {
          this.setState({
            teams: res.data.map((team) => team.name),
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeTeam(e) {
    this.setState({ team: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updatedPlayer = {
      name: this.state.name,
      birthDate: this.state.birthDate,
      team: this.state.team,
      post: this.state.post,
      goals: this.state.goals,
      mins: this.state.mins,
      ycard: this.state.ycard,
      num: this.state.num,
    };

    axios
      .post(`/api/player/edit/${this.props.match.params.id}`, updatedPlayer)
      .then((res) => console.log(res.data));

    window.location = "/players";
  }

  render() {
    const { errors } = this.state;

    const postOptions = [
      { label: "Select post" },
      { label: "Left wing", value: "Left wing" },
      { label: "Left back", value: "Left back" },
      { label: "Center", value: "Center" },
      { label: "Right back", value: "Right back" },
      { label: "Right wing", value: "Right wing" },
      { label: "Pivot", value: "Pivot" },
      { label: "Goalkeeper", value: "Goalkeeper" },
    ];

    return (
      <div className="landing position-relative overflow-auto p-3 p-md-5 text-center bg-light">
        <div className="doboz mt-5 mx-auto w-50 text-white">
          <p className="display-4 p-2">Edit player</p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-row">
              <p className="form-group mx-auto" style={{ width: "40%" }}>
                Name
              </p>
              <p className="form-group mx-auto" style={{ width: "40%" }}>
                Post
              </p>
            </div>
            <div className="form-row">
              <TextFieldGroup
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <SelectListGroup
                name="post"
                value={this.state.post}
                onChange={this.onChange}
                options={postOptions}
                error={errors.post}
              />
            </div>
            <div className="form-row">
              <p className="form-group mx-auto" style={{ width: "40%" }}>
                Date of Birth
              </p>
              <p className="form-group mx-auto" style={{ width: "40%" }}>
                Select a team!
              </p>
            </div>
            <div className="form-row">
              <TextFieldGroup
                type="date"
                name="birthDate"
                value={this.state.birthDate}
                onChange={this.onChange}
                error={errors.birthDate}
              />
              <select
                className={classnames(
                  "form-group mx-auto form-control form-control-lg",
                  {
                    "is-invalid": errors.team,
                  }
                )}
                style={{ width: "40%" }}
                value={this.state.team}
                onChange={this.onChangeTeam}
              >
                {this.state.teams.map(function (team) {
                  return (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  );
                })}
              </select>
              {errors.team && (
                <div className="invalid-feedback text-white">{errors.team}</div>
              )}
            </div>
            <div className="form-row">
              <p className="form-group mx-auto" style={{ width: "40%" }}>
                Goals
              </p>
              <p className="form-group mx-auto" style={{ width: "40%" }}>
                2 min penalties
              </p>
            </div>
            <div className="form-row">
              <TextFieldGroup
                type="number"
                placeholder="Goals"
                name="goals"
                value={this.state.goals}
                onChange={this.onChange}
                error={errors.goals}
              />
              <TextFieldGroup
                type="number"
                placeholder="2 min penalties"
                name="mins"
                value={this.state.mins}
                onChange={this.onChange}
                error={errors.mins}
              />
            </div>
            <div className="form-row">
              <p className="form-group mx-auto" style={{ width: "40%" }}>
                Yellow cards
              </p>
              <p className="form-group mx-auto" style={{ width: "40%" }}>
                Number
              </p>
            </div>
            <div className="form-row">
              <TextFieldGroup
                type="number"
                placeholder="Yellow cards"
                name="ycard"
                value={this.state.ycard}
                onChange={this.onChange}
                error={errors.ycard}
              />
              <TextFieldGroup
                type="number"
                placeholder="Number"
                name="num"
                value={this.state.num}
                onChange={this.onChange}
                error={errors.num}
              />
            </div>
            <button className="btn bg-white btn-lg mb-3" type="submit">
              Save changes
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(EditPlayer);
