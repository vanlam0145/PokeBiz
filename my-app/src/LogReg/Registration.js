import React, { Component } from 'react';
import axios from 'axios';
import auth from "../auth";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";



export class Registration extends Component {
  constructor(props) {
    super(props);
    this.onChangeAccountUserName = this.onChangeAccountUserName.bind(this);
    this.onChangeAccountPass = this.onChangeAccountPass.bind(this);
    this.onChangeAccountName = this.onChangeAccountName.bind(this);
    this.onChangeAccountEmail = this.onChangeAccountEmail.bind(this);
    this.onChangeAccountPhone = this.onChangeAccountPhone.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeAccountconfirmPassword = this.onChangeAccountconfirmPassword.bind(this);

    this.state = {
      show: false,
      username: '',
      pass: '',
      confirmPassword: '',
      createdate: null,
      isadmin: false,
      _idacc: ''
    }
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

  onChangeAccountName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeAccountPhone(e) {
    this.setState({
      phone: e.target.value
    });
  }

  onChangeAccountEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangeAccountconfirmPassword(e) {
    this.setState({
      confirmPassword: e.target.value
    });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  onSubmit(e) {    
    const obj = {
      username: this.state.username,
      pass: this.state.pass,
      createdate: this.state.createdate,
      isadmin: this.state.isadmin      
    }
    const user = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      _idacc: this.state._idacc

    }
    e.preventDefault();
    console.log(`username: ${this.state.username}`);
    console.log(`pass: ${this.state.pass}`);
    axios.get('http://localhost:4000/poke/char/checkexisacc/' + this.state.username)
      .then( async (res) => {
        if (res.data == "dcdangki") {
          this.setState({ dcdk: true })
          const { pass, confirmPassword } = this.state;
          // perform all neccassary validations
          if (pass !== confirmPassword) {
            alert("Passwords don't match");
          }  else {
            console.log("ddc dang ki nhe")
            const data=await axios.post('http://localhost:4000/poke/add/', obj)
            // .then(res => console.log(res.data._id));
            //console.log(data.data._id);
            user._idacc=data.data._id;
            this.setState({_idacc: data.data._id});
            console.log(user._idacc)


            axios.post('http://localhost:4000/poke/adduser/', user)
            .then(res => console.log(res.data));
            this.props.nextStep();
          }

          
        }
        else {
          this.handleShow();
          // this.setState({ show: true });
          console.log("acc co roi nhe")
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
        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lỗi</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tài khoản đã tồn tại, chọn tên tài khoản khác
         
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
          <div className="card-body">
            <h3 className="card-title">Enter Information To Registration</h3>
            <form onSubmit={this.onSubmit}>
              <div>
                <div className="form-group">
                  <label htmlFor="inputAddress">User Name</label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="User Name" 
                  value={this.state.username}
                  onChange={this.onChangeAccountUserName}></input>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Name</label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="Name" 
                  value={this.state.name}
                  onChange={this.onChangeAccountName}/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Phone</label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="Phone" 
                  value={this.state.phone}
                  onChange={this.onChangeAccountPhone}/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Email</label>
                  <input type="text" className="form-control" id="inputAddress" placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChangeAccountEmail}/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress2">PassWord</label>
                  <input type="password" className="form-control" id="inputAddress2" placeholder="PassWord" 
                  value={this.state.pass}
                  onChange={this.onChangeAccountPass}/>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress2">Re-PassWord</label>
                  <input type="password" className="form-control" id="inputAddress2" placeholder="Re-PassWord" 
                  value={this.state.confirmPassword}
                  onChange={this.onChangeAccountconfirmPassword}/>
                </div>
                <button class="btn btn-primary btn-round center" style={{ top: "50%" }} type="button" type="submit">
              <i class="now-ui-icons ui-2_favourite-28" type="submit"></i> Registration
            </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Registration;



