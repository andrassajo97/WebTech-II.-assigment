import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import axios from "axios";

class EditTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      division: "",
      address: "",
      phonenumber: "",
      webpage: "",
      value: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
  }

  onSubmit(e) {
    e.preventDefault();

    const updatedTeam = {
      name: this.state.name,
      division: this.state.division,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      webpage: this.state.webpage,
      value: this.state.value,
    };

    axios
      .post(`/api/team/edit/${this.props.match.params.id}`, updatedTeam)
      .then((res) => console.log(res.data));

    window.location = "/teams";
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    const divisionOptions = [
      { label: "Select division" },
      { label: "NB 1", value: "NB 1" },
      { label: "NB 1/B", value: "NB 1/B" },
      { label: "NB 2", value: "NB 2" },
    ];

    return (
      <div className="landing position-relative overflow-auto p-3 p-md-5 text-center bg-light">
        <div className="doboz mt-5 mx-auto w-50 text-white">
          <p className="display-4 p-2">Edit team</p>
          <form onSubmit={this.onSubmit}>
            <div className="form-row">
              <TextFieldGroup
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={this.onChange}
                error={errors.name}
              />
              <SelectListGroup
                name="division"
                value={this.state.division}
                onChange={this.onChange}
                options={divisionOptions}
                error={errors.division}
              />
            </div>
            <div className="form-row">
              <TextFieldGroup
                placeholder="Address"
                name="address"
                value={this.state.address}
                onChange={this.onChange}
                error={errors.address}
              />
              <TextFieldGroup
                placeholder="Phone number"
                name="phonenumber"
                value={this.state.phonenumber}
                onChange={this.onChange}
                error={errors.phonenumber}
              />
            </div>
            <div className="form-row">
              <TextFieldGroup
                placeholder="Webpage"
                name="webpage"
                value={this.state.webpage}
                onChange={this.onChange}
                error={errors.webpage}
              />
              <TextFieldGroup
                type="number"
                placeholder="Value ($)"
                name="value"
                value={this.state.value}
                onChange={this.onChange}
                error={errors.value}
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

export default withRouter(EditTeam);
