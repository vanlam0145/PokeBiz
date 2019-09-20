import React, { Component } from 'react'

export class BagPokeDex extends Component {
    render() {
        return (
            <div className="col-sm-4 col-lg-2 col-md-3">
                <div className="thumbnail">
                    <img style={{opacity:this.props.poke.dex}} className="img-responsive" alt="" src={this.props.poke.image}></img>
                </div>
            </div>
        )
    }
}
export default BagPokeDex;