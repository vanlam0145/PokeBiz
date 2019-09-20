class Auth {
  //constructor() {
    //this.authenticated = false;
  //}

  login(cb) {
    //this.authenticated = true;
    localStorage.setItem('isAuth', this.authenticated);
    cb();
  }

  loginadmin(cbb) {
    //this.authenticated = true;
    localStorage.setItem('isAdmin', this.authenticated);
    cbb();
  }

  logout(cb) {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('isAdmin');
    cb();
  }

  nothing(cb) {
    cb();
  }

  // isAuthenticated() {
  //   return this.authenticated;
  // }
}

export default new Auth();
