import React from "react";

const ErrorsList = (props) => {
  let errorsList = props.errorsList.map((error) => (
    <p className={"error"} key={error.message}>
      {error.message}
    </p>
  ));
  return errorsList;
};

class Login extends React.Component {
  state = {};
  render() {
    const formlogout = (
      <div className={"loginlabel"}>
        <h2>Jesteś zalogowany </h2>
        <button
          className={"btnform"}
          type={"submit"}
          onClick={this.props.handleLogout}
        >
          WYLOGUJ
        </button>
      </div>
    );
    const formlog = (
      <form onSubmit={this.props.handleLoginSubmit}>
        <h2>
          Nie masz konta?{" "}
          <span className={"reglogbtn"} onClick={this.props.handleSwitchLogReg}>
            Zarejestruj się
          </span>
        </h2>
        <label className={"loginlabel"} htmlFor="email">
          Wprowadź email:
          <input
            className={"logPanel"}
            type="email"
            id="email"
            name="email"
            value={this.props.email}
            onChange={this.props.handleLoginChange}
          />
        </label>
        <label className={"loginlabel"} htmlFor="password">
          Wprowadź hasło:
          <input
            className={"logPanel"}
            type="password"
            id="password"
            name="password"
            value={this.props.password}
            onChange={this.props.handleLoginChange}
          />
        </label>
        <div className={"loginlabel"}>
          <button className={"btnform"} type={"submit"}>
            ZALOGUJ
          </button>
        </div>
      </form>
    );
    return (
      <div className={"loginlabel"}>
        {this.props.islogged ? formlogout : formlog}
        <div className={"loginlabel"}>
        <button className={"btnform"} onClick={this.props.handleShowLoginPanel}>
            Zamknij
        </button>
          </div>
        <h2 className={"msg"}>{this.props.message}</h2>
        {this.props.errorsList ? (
          <ErrorsList errorsList={this.props.errorsList} />
        ) : null}
      </div>
    );
  }
}
export default Login;