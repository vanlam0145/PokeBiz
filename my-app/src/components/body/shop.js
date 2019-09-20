import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ShopPoke from './bodyshop/pokemon';
import ShopItem from './bodyshop/item';
import axios from 'axios';
export class Shop extends Component {

    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.state = { getInforChar: {}, getItem: {}, show: false, bagpoke: [], items: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/poke/char/' + this.props.idchar)
            .then(response => {
                this.setState({ getInforChar: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
        axios.get('http://localhost:4000/poke/item')
            .then(response => {
                this.setState({ items: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    handleClose() {
        this.setState({ show: false });
    }
    handleOk() {
        this.setState({ show: false });
        if (this.state.getItem.price <= this.state.getInforChar.coin) {
            const obj={
                idchar:this.props.idchar,
                item:this.state.getItem
            }
            axios.post('http://localhost:4000/poke/char/update', obj)
                .then(res => console.log(res.data));
        }
    }
    handleShow(item) {
        this.setState({ getItem: item, show: true });
    }
    render() {
        return (
            <div>
                <div className="container">
                    <Tabs defaultActiveKey='home' id='uncontrolled-tab-example'>
                        <Tab eventKey='home' title='pokemon'>
                            <div className="row">
                                {this.props.pokemon.map((poke, index) => (
                                    <ShopPoke key={index} poke={poke} handleShow={this.handleShow}></ShopPoke>
                                ))}
                            </div>
                        </Tab>
                        <Tab eventKey='item' title='item'>
                            <div className="row">
                                {this.state.items.map((item, index) => (
                                    <ShopItem key={index} item={item} handleShow={this.handleShow}></ShopItem>
                                ))}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Check</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>you are realy buy it!?
                    You have {this.state.getInforChar.coin} coins left in your account
                    If you buy it, you only have {this.state.getInforChar.coin}-{this.state.getItem.price} coins
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
            </Button>
                        <Button variant="primary" onClick={this.handleOk}>
                            okey
            </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default Shop