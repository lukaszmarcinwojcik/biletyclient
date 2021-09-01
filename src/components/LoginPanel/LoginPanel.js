import React from "react";
import "./LoginPanel.css";
import Login from "./Login";
import Registration from "./Registration";

class LoginPanel extends React.Component {
  state = {
    isActiveLogin: true,
    isActiveRegistration: false,
  };
  handleSwitchLogReg = () => {
    this.setState({
      isActiveLogin: !this.state.isActiveLogin,
      isActiveRegistration: !this.state.isActiveRegistration,
    });
  };
  render() {
  
  
    return (
      <div className={"loginpanel"}>
        {this.state.isActiveLogin ? (
          <Login
            handleLogout={this.props.handleLogout}
            islogged={this.props.islogged}
            message={this.props.message}
            errorsList={this.props.errorsList}
            handleShowLoginPanel={this.props.handleShowLoginPanel}
            email={this.props.email}
            password={this.props.password}
            handleLoginChange={this.props.handleLoginChange}
            handleLoginSubmit={this.props.handleLoginSubmit}
            handleSwitchLogReg={this.handleSwitchLogReg}
          />
        ) : null}
        {this.state.isActiveRegistration ? (
          <Registration
            handleSwitchLogReg={this.handleSwitchLogReg}
            handleShowLoginPanel={this.props.handleShowLoginPanel}
          />
        ) : null}
      </div>
    );
  }
}

export default LoginPanel;