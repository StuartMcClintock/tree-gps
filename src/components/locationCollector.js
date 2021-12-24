import React, { Component } from "react";
import { CSVLink } from "react-csv";

export default class LocationCollector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  headers = [
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
    { label: "Location #", key: "num" },
  ];

  addCoord = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newList = this.state.data;
      newList.unshift({ num: this.state.data.length+1, latitude: position.coords.latitude, longitude: position.coords.longitude});
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
        <h2>Tree GPS</h2>
        <button onClick={() => this.addCoord()}>Add Current Location</button>
        <button onClick={() => this.removeCoord()}>Remove Latest Location</button>
        <br />
        {this.state.data.map(data => <p>{data.num}. Lat: {data.latitude}, Lon: {data.longitude}</p>)}
        <br />
        <CSVLink data={this.state.data} headers={this.headers} filename={"coordinate-list.csv"}>
          Download CSV
        </CSVLink>
      </div>
    );
  }
}
