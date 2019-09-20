import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import { Map, Marker,Polygon, GoogleApiWrapper } from "google-maps-react";
import Inforpoke from './informap/inforpokestop.js';
import axios from 'axios';
export class Mapgg extends Component {
    constructor(props) {
        super(props);
        this.handleinforPokeShow = this.handleinforPokeShow.bind(this);
        this.handleinforPokeClose = this.handleinforPokeClose.bind(this);
        this.handleinforPokeStopShow = this.handleinforPokeStopShow.bind(this);
        this.handleinforPokeStopClose = this.handleinforPokeStopClose.bind(this);
        this.additem = this.additem.bind(this);
        this.addpokemon = this.addpokemon.bind(this);
        this.center = { lat: 10.883280, lng: 106.781627 };
        this.state = {
            itemofonepokeStop: [],
            onePoke: {},
            onePokestop: {},
            inforPoke: false,
            inforPokeStop: false,
        }
    }
    additem(item) {
        const obj = {
            _id: item._id,
            itemofpokestop: item.itemofpokeStop,
            idchar: this.props.idchar
        }
        this.setState({ inforPokeStop: false })
        axios.post('http://localhost:4000/poke/char/additem', obj)
            .then(res => console.log(res.data));

    }
    addpokemon(onePoke) {
        const obj = {
            idchar: this.props.idchar,
            onePoke
        }
        this.setState({ inforPoke: false })
        if (onePoke.name != null) {
            axios.post('http://localhost:4000/poke/char/addpokemon', obj)
                .then(res => console.log(res.data));
        }
    }
    handleinforPokeShow(item) { this.setState({ onePoke: item, inforPoke: true }); }
    handleinforPokeClose() { this.setState({ inforPoke: false }); }
    handleinforPokeStopShow(item) { if (item != null) { this.setState({ onePokestop: item, itemofonepokeStop: item.itemofpokeStop, inforPokeStop: true }); }; }
    handleinforPokeStopClose() { this.setState({ inforPokeStop: false }); }
    render() {
        if(!this.props.full.lat){
            return (
                <div>
                    <Modal size="sm" show={this.state.inforPoke} onHide={this.handleinforPokeClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Infor Poke You Want Catch</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Name: {this.state.onePoke.name}<br />
                            LV : {this.state.onePoke.lv}<br />
                            CP : {this.state.onePoke.cp}<br />
                            <img src={this.state.onePoke.image} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleinforPokeClose}>
                                Close
                </Button>
                            <Button variant="primary" onClick={() => this.addpokemon(this.state.onePoke)}>
                                Okey
                </Button>
                        </Modal.Footer>
    
                    </Modal>
                    <Modal size="sm" show={this.state.inforPokeStop} onHide={this.handleinforPokeStopClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Infor PokeStop You Click</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
    
                            Name pokeStop you click:<p color="red"> {this.state.onePokestop.infor}</p><br />
                            Item of pokestop:<br />
                            <table>
                                <tbody>
                                    {this.state.itemofonepokeStop.map((ite, index) => <Inforpoke key={index} ite={ite}></Inforpoke>)}
                                </tbody>
                            </table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleinforPokeStopClose}>
                                Close
                </Button>
                            <Button variant="primary" onClick={() => this.additem(this.state.onePokestop)}>
                                Okey
                </Button>
                        </Modal.Footer>
                    </Modal>
                    <Map
    
                        google={this.props.google}
                        className={"map"}
                        zoom={17}
                        initialCenter={this.center}
                        center={{ lat: this.props.full.lat, lng: this.props.full.lng }}
                    >
                        {this.props.full.pokestop.map((item, index) => (
                            <Marker
                                key={index}
                                title={item.infor}
                                onClick={() => this.handleinforPokeStopShow(item)}
                                position={{ lat: item.coordinates.lat, lng: item.coordinates.lng }}
                                icon={{ url: '/pictures/PokemonStop.png', scaledSize: new this.props.google.maps.Size(100, 100) }}
                            />
                        ))}
                        {this.props.full.pokemon.map((item, index) => (
                            <Marker
                                key={index}
                                title={item.name}
                                visible={item.xh}
                                onClick={() => this.handleinforPokeShow(item)}
                                position={{ lat: item.lat, lng: item.lng }}
                                icon={{ url: item.image, scaledSize: new this.props.google.maps.Size(50, 50) }}
                            />
                        ))}
                        <Marker
                            //style={{ opacity: 0.4 }}
                            onClick={this.handleinfoWindowShow}
                            icon={{ url: '/pictures/player.png', scaledSize: new this.props.google.maps.Size(70,70) }}
                            position={this.props.full}
                        />
                    </Map>
    
                </div >
            )    
        }
        else{
            const triangleCoords = [
                { lat: this.props.full.lat-this.props.full.xq, lng: this.props.full.lng-this.props.full.xq },
                { lat: this.props.full.lat-this.props.full.xq, lng: this.props.full.lng+this.props.full.xq },
                { lat: this.props.full.lat+this.props.full.xq, lng: this.props.full.lng+this.props.full.xq },
                { lat: this.props.full.lat+this.props.full.xq, lng: this.props.full.lng-this.props.full.xq },
            ];
            return (
                <div>
                    <Modal size="sm" show={this.state.inforPoke} onHide={this.handleinforPokeClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Infor Poke You Want Catch</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Name: {this.state.onePoke.name}<br />
                            LV : {this.state.onePoke.lv}<br />
                            CP : {this.state.onePoke.cp}<br />
                            <img src={this.state.onePoke.image} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleinforPokeClose}>
                                Close
                </Button>
                            <Button variant="primary" onClick={() => this.addpokemon(this.state.onePoke)}>
                                Okey
                </Button>
                        </Modal.Footer>
    
                    </Modal>
                    <Modal size="sm" show={this.state.inforPokeStop} onHide={this.handleinforPokeStopClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Infor PokeStop You Click</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
    
                            Name pokeStop you click:<p color="red"> {this.state.onePokestop.infor}</p><br />
                            Item of pokestop:<br />
                            <table>
                                <tbody>
                                    {this.state.itemofonepokeStop.map((ite, index) => <Inforpoke key={index} ite={ite}></Inforpoke>)}
                                </tbody>
                            </table>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleinforPokeStopClose}>
                                Close
                </Button>
                            <Button variant="primary" onClick={() => this.additem(this.state.onePokestop)}>
                                Okey
                </Button>
                        </Modal.Footer>
                    </Modal>
                    <Map
    
                        google={this.props.google}
                        className={"map"}
                        zoom={17}
                        initialCenter={this.center}
                        center={{ lat: this.props.full.lat, lng: this.props.full.lng }}
                    >
                        {this.props.full.pokestop.map((item, index) => (
                            <Marker
                                key={index}
                                title={item.infor}
                                onClick={() => this.handleinforPokeStopShow(item)}
                                position={{ lat: item.coordinates.lat, lng: item.coordinates.lng }}
                                icon={{ url: '/pictures/PokemonStop.png', scaledSize: new this.props.google.maps.Size(100, 100) }}
                            />
                        ))}
                        {this.props.full.pokemon.map((item, index) => (
                            <Marker
                                key={index}
                                title={item.name}
                                visible={item.xh}
                                onClick={() => this.handleinforPokeShow(item)}
                                position={{ lat: item.lat, lng: item.lng }}
                                icon={{ url: item.image, scaledSize: new this.props.google.maps.Size(90, 90) }}
                            />
                        ))}
                        <Marker
                            //style={{ opacity: 0.4 }}
                            onClick={this.handleinfoWindowShow}
                            icon={{ url: '/pictures/player.png', scaledSize: new this.props.google.maps.Size(50, 50) }}
                            position={this.props.full}
                        />
                        <Polygon
                            paths={triangleCoords}
                            strokeColor={"#0000FF"}
                            strokeOpacity={0.8}
                            strokeWeight={2}
                            fillColor={"#0000FF"}
                            fillOpacity={0.35}/>
                    </Map>
    
                </div >
            )
        }
        
        
        
    }
}
export default GoogleApiWrapper({ apiKey: "AIzaSyDoR4RxlVoLzuMU13jMDRC3SdOeAkW_Rs8" })(Mapgg);