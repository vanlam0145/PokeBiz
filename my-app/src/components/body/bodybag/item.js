import React, { Component } from 'react'

export class BagItem extends Component {
    render() {
        return (
            <div className="col-sm-4 col-lg-2 col-md-2">
                <div className="thumbnail">
                    <img className="img-responsive" alt="" src={this.props.item.infox.image}></img>
                    <div className="caption-full">
                        <a href="#" >{this.props.item.infox.name}</a>
                        <a className="pull-right">count: {this.props.item.count}</a>
                    </div>
                    <button>aa</button>
                </div>
            </div>
        )
    }
}
export default BagItem;