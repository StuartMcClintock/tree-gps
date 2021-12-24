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

  updateCoords = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newList = this.state.data.concat({ latitude: position.coords.latitude, longitude: position.coords.longitude});
      this.setState({data: newList})
    });
  }

  render() {
    return (
      <div>
        <h2>GeoLocation</h2>
        <button onClick={() => this.updateCoords()}>Add Location</button>
        <br />
        {this.state.data.map(data => <p>Your latitude is: {data.latitude}, longitude: {data.longitude}</p>)}
        <CSVLink data={this.state.data} headers={this.headers}>
          Download CSV
        </CSVLink>
      </div>
    );
  }
}
