import React, { Component } from "react";

export default class LocationCollector extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Lat:", position.coords.latitude);
      console.log("Lon:", position.coords.longitude);
    });
  }

  render() {
    return (
      <div>
        <h2>GeoLocation</h2>
      </div>
    );
  }
}
