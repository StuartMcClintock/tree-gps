import React, { Component } from "react";

export default class LocationCollector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }

  updateCoords = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude})
    });
  }

  render() {
    return (
      <div>
        <h2>GeoLocation</h2>
        <button onClick={() => this.updateCoords()}>Add Location</button>
        {this.state.latitude ? <h4>Your latitude is {this.state.latitude}</h4> : null}
        {this.state.longitude ? <h4>Your longitude is {this.state.longitude}</h4> : null}
      </div>
    );
  }
}
