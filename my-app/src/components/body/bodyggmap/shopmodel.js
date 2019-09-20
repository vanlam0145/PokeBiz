import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Shop from "../shop";
export class ShopggMap extends Component {
    constructor(props) {
        super(props);
        this.state = { showshop: false }
    }
    handleClose() { this.setState({ showshop: false }); }
    handleShow() { this.setState({ showshop: true }); }
    render() {
        return (
            <div>
                <div className="anhh1" onClick={this.handleShow.bind(this)} ><a href="#"><img src="/pictures/shop.jpg" alt="Image" /></a></div>
                <Modal size="lg" show={this.state.showshop} onHide={this.handleClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="col-sm-2 menu-left">Shop</div>
                            <div className="col-sm-5 menu-right">test</div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Welcome to the shop!
          <Shop idchar={this.props.idchar} pokemon={this.props.pokemon} />
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default ShopggMap;