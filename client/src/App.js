import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import logoNav from "../src/resources/img/logoNav.png";
import logo from "../src/resources/img/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardAdmin from "./components/admin.component";
import DataUpload from "./components/upload.component";
import DataList from "./components/list.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showAdminBoard: false,
      showDataList: false,
      showDataUpload: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showDataList:
          user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_USER"),
        showDataUpload:
          user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_USER"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showAdminBoard, showDataList, showDataUpload } =
      this.state;

    return (
      <div className="view">
        <Navbar collapseOnSelect expand="sm" variant="dark" bg="dark">
          <Container>
            <Navbar.Brand href="/">
              <img src={logoNav} className="d-inline-block" width="130px" />
              {/* BioData */}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav ">
              <Nav>
                <div className="navbar-nav mr-auto">
                  <Link to={"/home"} className="nav-link ">
                    Home
                  </Link>

                  {showAdminBoard && (
                    <Link to={"/admin"} className="nav-link">
                      Admin Board
                    </Link>
                  )}
                  {showDataList && (
                    <Link to={"/data"} className="nav-link ">
                      Data
                    </Link>
                  )}
                  {showDataUpload && (
                    <Link to={"/upload"} className="nav-link ">
                      Upload
                    </Link>
                  )}
                </div>

                {currentUser ? (
                  <div className="navbar-nav ml-auto justify-content-end">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>

                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      Logout
                    </a>
                  </div>
                ) : (
                  <div className="navbar-nav ml-auto justify-content-end">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>

                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </div>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/data" component={DataList} />
            <Route path="/upload" component={DataUpload} />
          </Switch>
        </div>

        <footer className="footer">
          <div className="container">
            <div className="footer_addr">
              <div className="nav_logo" id="footer_logo">
                <a href="/">
                  <img src={logo} className="d-inline-block" width="120px" />
                </a>
              </div>
              <span>
                <span id="name_copy">UTFPR</span> | &copy; 2021 All rights
                reserved.
              </span>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
