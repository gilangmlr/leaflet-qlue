import React, { Component } from 'react';
import { Icon } from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: -6.21462,
      lng: 106.84513,
      zoom: 12,
    };
  }
  render() {
    const position = [this.state.lat, this.state.lng];
    let iconUrl = "http://www.qlue.co.id/vacancy/svc/icon-marker.png";
    let icon = new Icon({iconUrl: iconUrl});
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Leaflet-Qlue</h1>
        </header>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          <Marker position={position} icon={icon}>
            <Popup>
              <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default App;
