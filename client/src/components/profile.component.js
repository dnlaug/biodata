import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div>
        <div className="card">
          {this.state.userReady ? (
            <div>
              <div className="card-header">
                <h5 className="profile">
                  Profile: <strong>{currentUser.username}</strong>
                </h5>
              </div>
              <div className="card-body">
                <p>
                  <strong>Id:</strong> {currentUser.id}
                </p>
                <p>
                  <strong>Email:</strong> {currentUser.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                  {currentUser.roles &&
                    currentUser.roles.map((role, index) => (
                      <li key={index}>{role}</li>
                    ))}
                </ul>
              </div>
              <div className="card-footer text-muted">
                <p>
                  <strong>Token:</strong>{" "}
                  <small>{currentUser.accessToken}</small>
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
