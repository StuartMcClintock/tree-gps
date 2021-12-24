import React, { Component } from "react";
import { CSVLink } from "react-csv";

export default class LocationCollector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }

  headers = [
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
  ];

  addCoord = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newList = this.state.data;
      newList.unshift({ latitude: position.coords.latitude, longitude: position.coords.longitude});
      this.setState({data: newList})
    });
  }

  removeCoord = () => {
    const newList = this.state.data.splice(1);
    this.setState({data: newList})
  }

  render() {
    return (
      <div>
        <h2>TreeGPS</h2>
        <button onClick={() => this.addCoord()}>Add Current Location</button>
        <button onClick={() => this.removeCoord()}>Remove Latest Location</button>
        <br />
        {this.state.data.map(data => <p>Your latitude is: {data.latitude}, longitude: {data.longitude}</p>)}
        <br />
        <CSVLink data={this.state.data} headers={this.headers} filename={"coordinate-list.csv"}>
          Download CSV
        </CSVLink>
      </div>
    );
  }
}
