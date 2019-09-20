import React from "react";

class A extends React.Component {
    render() {
      return <div>I'm A, with {this.props.testProp}</div>;
    }
  }
  
  class B extends React.Component {
    render() {
      return <div>I'm B, with {this.props.testProp}
      </div>;
    }
  }
  
 export class Test extends React.Component {
    render() {
      

      const components = [A, B];
      const componentsToRender = components.map((Component, i) => (
        <Component key={i} testProp="testProp"/>
      ));
      return <div>{componentsToRender}</div>;
    }
  }
export default Test;