import React, { Component } from 'react'

export class BagPoke extends Component {
    render() {
        return (
            <div className="col-sm-4 col-lg-2 col-md-2">
                <div className="thumbnail">
                    <img className="img-responsive" alt="" src={this.props.poke.image}></img>
                    <div className="caption-full">
                        <a href="#" >{this.props.poke.name}</a>
                        <a className="pull-right">cp: {this.props.poke.cp}</a>
                    </div>
                    <button>aa</button>
                </div>
            </div>
        )
    }
}
export default BagPoke;