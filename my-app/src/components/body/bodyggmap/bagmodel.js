import React, { Component } from "react";
import Bag from "../bagpoke";
import Modal from "react-bootstrap/Modal";
export class BagggMap extends Component {
    constructor(props) {
        super(props);
        this.state = { showbag: false }
    }
    handlebagClose() { this.setState({ showbag: false }); }
    handlebagShow() { this.setState({ showbag: true }); }
    render() {
        return (
            <div>
                <div className="anhh" onClick={this.handlebagShow.bind(this)}><a href="#"><img src="/pictures/bag.png" alt="Image" /></a></div>
                <Modal size="lg" show={this.state.showbag} onHide={this.handlebagClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>bag
                          test
            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Welcome to the bag!
          <Bag pokemon={this.props.pokemon} idchar={this.props.idchar} />
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default BagggMap;