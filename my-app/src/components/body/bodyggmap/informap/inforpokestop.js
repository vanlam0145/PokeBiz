import React, { Component } from 'react';

export class InfoPoke extends Component {

    render() {
        return (
                <td>
                    <tr><img src={this.props.ite.image} /></tr>
                    <tr>{this.props.ite.name}</tr>
                </td>
        )
    }
}
export default InfoPoke