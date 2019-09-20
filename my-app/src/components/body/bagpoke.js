import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import BagPoke from './bodybag/pokemon';
import BagItem from './bodybag/item';
import BagPokeDex from './bodybag/pokedex';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { runInThisContext } from 'vm';
export default class TodosList extends Component {
    constructor(props) {
        super(props);
        this.check2 = this.check2.bind(this);
        this.state = { show: false, bagpoke: [], items: [], poke: []};
    }
    async componentDidMount() {
        const poke = await axios.get('http://localhost:4000/poke/char/bag/'+this.props.idchar)
        const ite = await axios.get('http://localhost:4000/poke/char/item/'+this.props.idchar)
        this.setState({
            bagpoke: poke.data,
            items: ite.data
        })
        this.check();
    }
    handleClose() {
        this.setState({ show: false });
    }
    handleShow(item) {
        this.setState({ getItem: item, show: true });
    }
    check2(poke) {
        var x = this.state.bagpoke.length;
        for (var i = 0; i < x; i++) {
            if (this.state.bagpoke[i].name == poke.name) {
                return true
            }
        }
        return false;
    }
    check() {
        var po = this.props.pokemon.map((po1, index1) => {
            if (this.check2(po1) == true) {
                po1.dex = '1';
            }
            return po1;
        })
        this.setState({ poke: po })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <Tabs defaultActiveKey='home' id='uncontrolled-tab-example'>
                        <Tab eventKey='home' title='pokemon'>
                            <div className="row">
                                {this.state.bagpoke.map((poke, index) => (
                                    <BagPoke key={index} poke={poke}></BagPoke>
                                ))}
                            </div>
                        </Tab>
                        <Tab eventKey='item' title='item'>
                            <div className="row">
                                {this.state.items.map((item, index) => (
                                    <BagItem key={index} item={item}></BagItem>
                                ))}
                            </div>
                        </Tab>
                        <Tab eventKey='pokedex' title='pokedex'>
                            <div className='row'>
                                {this.state.poke.map((poke, index) => (
                                    <BagPokeDex key={index} poke={poke}></BagPokeDex>
                                ))}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}