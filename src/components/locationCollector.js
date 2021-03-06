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
    { label: "Location #", key: "num" },
    { label: "Latitude", key: "latitude" },
    { label: "Longitude", key: "longitude" },
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
        <h2>Tree Location Logger</h2>
        <button onClick={() => this.addCoord()}>Add Current Location</button>
        <button onClick={() => this.removeCoord()}>Remove Latest Location</button>
        <br />
        {this.state.data.map(data => <p>{data.num}. Latitude: {data.latitude}, Longitude: {data.longitude}</p>)}
        <br />
        <CSVLink data={this.state.data.slice().reverse()} headers={this.headers} filename={"coordinate-list.csv"}>
          Download Data
        </CSVLink>
        <br />&nbsp;<br />
        <br />&nbsp;<br />
      </div>
    );
  }
}
