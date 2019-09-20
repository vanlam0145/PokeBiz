import React, { Component } from 'react'

export class ShopPoke extends Component {
    onc(){
        var {poke,handleShow}=this.props;
        handleShow(poke);
    }
    render() {
        return (
            <div className="col-sm-2 col-lg-2 col-md-2">
                <div className="thumbnail">
                    <img className="img-responsive" alt="" src={this.props.poke.image}></img>
                    <div className="caption-full">
                        <a href="#" >{this.props.poke.name}</a>
                        <a className="pull-right">price: {this.props.poke.price}</a>
                    </div>
                    <button onClick={this.onc.bind(this)}>buy</button>
                </div>
            </div>
        )
    }
}
export default ShopPoke;