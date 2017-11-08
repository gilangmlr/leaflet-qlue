import React, { Component } from 'react';
import { Icon } from 'leaflet';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import 'whatwg-fetch';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: -6.21462,
      lng: 106.84513,
      zoom: 12,
      reports: [],
      popupOpen: false,
      popupData: {}
    };
  }
  markerOnclick(e) {
    this.setState(
      {
        ...this.state,
        popupOpen: true,
        popupData: e.target.options.dataReport
      }
    )
  }
  popupClose(e) {
    this.setState(
      {
        ...this.state,
        popupOpen: false,
        popupData: {}
      }
    )
  }
  componentDidMount() {
    fetch("http://ext.qlue.id/example/top_report", {
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicWx1ZWluIiwiaWF0IjoxNDk0Mzk5Njg1fQ.mG5wmoCwmchufTPloxI7AjZaeM_bwcpCEJpyUnCDrmk"
      }
    }).then((res) => {return res.json()}).then((res) => {
      this.setState(
        {
          ...this.state,
          reports: res
        }
      );
    });
  }
  render() {
    const position = [this.state.lat, this.state.lng];
    let iconUrl = "http://www.qlue.co.id/vacancy/svc/icon-marker.png";
    let icon = new Icon({iconUrl: iconUrl});
    return (
      <div className="App">
        {
          (this.state.popupOpen)?
            <div style={{
              position: "absolute",
              zIndex: 9998,
              backgroundColor: "rgba(0, 0, 0, .5)",
              width: "100%",
              height: "100%"
            }}>
              <div style={{
                position: "absolute",
                top: "16%",
                left: "50%",
                zIndex: 9999,
                width: "512px"
              }}>
                <div style={{
                  position: "absolute",
                  left: "-50%",
                  backgroundColor: "rgba(255, 255, 255, .5)",
                  padding: "8px",
                  width: "512px"
                }}>
                  <div >
                    <img src={this.state.popupData.image_url} width="240px" alt="" />
                  </div>
                  <div style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    padding: "4px"
                  }}>
                    <div>
                      {this.state.popupData.description}
                    </div>
                    <hr />
                    <div>
                      {this.state.popupData.kelurahan + ", " + this.state.popupData.kecamatan + ", " + this.state.popupData.kabupaten}
                    </div>
                    <div>
                      {this.state.popupData.provinsi}
                    </div>
                    <hr />
                    <div>
                      <button onClick={this.popupClose.bind(this)}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          :
            ''
        }
        <header className="App-header">
          <h1 className="App-title">Welcome to Leaflet-Qlue</h1>
        </header>
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {
            this.state.reports.map((report, index) => {
              return (
                <Marker
                  key={index}
                  dataReport={report} onClick={this.markerOnclick.bind(this)}
                  position={[report.lat, report.lng]} icon={icon}>
                </Marker>
              );
            })
          }
        </Map>
      </div>
    );
  }
}

export default App;
