import React, { Component } from 'react';
import auth from "../auth";
import axios from 'axios';
import { Alert } from 'reactstrap';

import { connect } from 'react-redux';
export class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeAccountUserName = this.onChangeAccountUserName.bind(this);
    this.onChangeAccountPass = this.onChangeAccountPass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      pass: '',
      visible: false
    }
  }
  toggle() {
    this.setState({
      visible: !this.state.visible
    });
  }
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  onChangeAccountUserName(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeAccountPass(e) {
    this.setState({
      pass: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(`username: ${this.state.username}`);
    console.log(`pass: ${this.state.pass}`);
    axios.get('http://localhost:4000/poke/char/checkacc/' + this.state.username + '/' + this.state.pass)
      .then(res => {
        if (res.data.check == "dungr") {
          auth.login(() => {
            var { dispatch } = this.props;
            dispatch({ type: 'LOG', item: res.data._idchar })
            this.props.history.push("/home");
          });
        }
        if (res.data.check == "isadmin") {
          console.log("la acc admin")
          auth.loginadmin(() => {
            this.props.history.push("/admin");
          });
        }
        else {

          {
            this.setState({
              visible: !this.state.visible
            });
          }
        }
      }
      );
  }

  render() {
    // console.log("day la bien duyyyy" + this.props.logg);
    const { values, handleChange } = this.props;
    return (
      <div>
        <div className="background-image"><a ><img src="/pictures/desktop.jpg" id="bg" alt="Image" /></a></div>
        <div className="card centered" style={{ position: 'fixed', width: '20rem', left: "50%" }} >
          <div className="card-body">
            <h3 className="card-title">ACCOUNT LOGIN</h3>
            <form onSubmit={this.onSubmit}>
              <div>
                <Alert color="warning" isOpen={this.state.visible} toggle={this.toggle.bind(this)}>Mật khẩu hoặc tên tài khoản không đúng       
                  <button class="btn btn-primary"
                  onClick={() => {
                    auth.logout(() => {
                      this.props.history.push("/");
                    });
                  }}>OK. NHẬP LẠI</button>
                </Alert>
                <div className="form-group">
                  <label htmlFor="inputAddress">User Name</label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="User Name"
                    value={this.state.username}
                    onChange={this.onChangeAccountUserName}></input>
                  {/* <input type="text" className="form-control" id="inputAddress" placeholder="User Name"
                    value={this.state.username}
                    onChange={this.onChangeAccountUserName}
                  /> */}
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress2">PassWord</label>
                  <input type="PassWord" className="form-control" id="inputAddress2" placeholder="PassWord"
                    value={this.state.pass}
                    onChange={this.onChangeAccountPass}
                  />
                </div>
              </div>
              <button class="btn btn-primary btn-round center" style={{ top: "50%" }} type="submit">
                <i class="now-ui-icons ui-2_favourite-28" type="submit"></i> Login
            </button>
            </form>

          </div>
          <p class="text-muted">
            Don't have an account?
        <button class="btn btn-warning btn-link" onClick={this.back}>Sign up</button>
          </p>

        </div>
      </div>
    );
  }
}

export default connect(function (state) {
  return {
    id: state
  }
})(Login);