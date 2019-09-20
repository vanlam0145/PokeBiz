import React, { Component } from 'react'

export class ShopItem extends Component {
    onc(){
        var {item,handleShow}=this.props;
        handleShow(item);
    }
    render() {
        return (
            <div className="col-sm-4 col-lg-2 col-md-2">
                <div className="thumbnail">
                    <img className="img-responsive" alt="" src={this.props.item.image}></img>
                    <div className="caption-full">
                        <a href="#" >{this.props.item.name}</a>
                        <a className="pull-right">price: {this.props.item.price}</a>
                    </div>
                    <button onClick={this.onc.bind(this)}>buy</button>
                </div>
            </div>
        )
    }
}
export default ShopItem;