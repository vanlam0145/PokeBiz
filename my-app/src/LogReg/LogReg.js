import React, { Component } from 'react';

import Login from "./Login";
import Registration from "./Registration";

export class LogReg extends Component {
  constructor(props) {
    super(props);
  }
  //export class UserForm extends Component {
  state = {
    step: 2,
    giatri: ''
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    console.log('ok');
    console.log(this.props.history);

    switch (step) {
      case 1:
        return (
          <Registration
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            hieu={this.props}
          />
        );

      case 2:
        return (
          <Login
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            {...this.props}
          />
        );
    }
  }

}

export default LogReg;