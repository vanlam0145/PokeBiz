import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import axios from 'axios';
import { connect } from 'react-redux';

import Bagggmap from "./bodyggmap/bagmodel";
import Shopggmap from "./bodyggmap/shopmodel";
import Mapm from "./bodyggmap/mapmodel";
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.center = { lat: 10.883280, lng: 106.781627 };
    this.state = {
      lat: '',
      lng: '',
      pokestop: [],
      pokemon: [],
      xq:'',
    };
  }
  getPosition = function (options) {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
  check() {
    var pokexh = this.state.pokemon.map((poke, index) => {
      if ((Math.abs(poke.lat - this.state.lat) < this.state.xq) && (Math.abs(poke.lng - this.state.lng) < this.state.xq)) {
        poke.xh = true;
      }
      else {
        poke.xh = false;
      }
      return poke
    }
    );
    this.setState({ pokemon: pokexh })
  }
  async componentWillMount() {
    const respokestop = await axios.get('http://localhost:4000/poke/pokestop')
    
    const aa = await this.getPosition()
    const respokemon = await axios.get('http://localhost:4000/poke/pokemon/'+aa.coords.latitude+'/'+aa.coords.longitude)
    console.log(respokemon.data);
    this.setState({
      pokestop: respokestop.data,
      pokemon: respokemon.data,
      lat: aa.coords.latitude,
      lng: aa.coords.longitude,
      xq:0.002
    })
    this.check()
  }
  
  componentDidMount() {
    this.props.google.maps.event.addDomListener(document, 'keyup', this.moveLocation);
  }
  moveLocation = (e) => {
    var code = (e.keyCode ? e.keyCode : e.which);

    if (code === 87) {
      console.log("W");
      this.state.lat = this.state.lat + 0.0001
      this.setState(this.state);
      this.check()
    }
    if (code === 83) {
      console.log("S");
      this.setState({ lat: this.state.lat - 0.0001 });
      this.check()
    }
    if (code === 65) {
      console.log("A");
      this.setState({ lng: this.state.lng - 0.0001 });
      this.check()
    }
    if (code === 68) {
      console.log("D");
      this.setState({ lng: this.state.lng + 0.0001 });
      this.check()
    }
  }
  render() {
    if(!this.props.id.log){
      return (
        <div className="map-container">
          <div className="image"  ><a href="#"><img src="/pictures/pokeball1.png" alt="Image" /></a></div>
          <Bagggmap idchar={this.props.id} pokemon={this.state.pokemon}></Bagggmap>
          <Shopggmap idchar={this.props.id} pokemon={this.state.pokemon}></Shopggmap>
          <Mapm idchar={this.props.id} full={this.state}></Mapm>
          <div className='inforchar' >
            <a>some text</a><br/>
            <p>some some text</p>
          </div>
        </div>
      );
    }
    else{
      return (
        <div className="map-container">
          <div className="image"  ><a href="#"><img src="/pictures/pokeball1.png" alt="Image" /></a></div>
          <Bagggmap idchar={this.props.id.log} pokemon={this.state.pokemon}></Bagggmap>
          <Shopggmap idchar={this.props.id.log} pokemon={this.state.pokemon}></Shopggmap>
          <Mapm idchar={this.props.id.log} full={this.state}></Mapm>
          <div className='inforchar' >
            <a>some text</a><br/>
            <p>some some text</p>
          </div>
        </div>
      );
    }
    
  }
}

export default connect(function(state){
  return {id:state}
})(GoogleApiWrapper({
  apiKey: "AIzaSyDoR4RxlVoLzuMU13jMDRC3SdOeAkW_Rs8"
})(MapContainer));
