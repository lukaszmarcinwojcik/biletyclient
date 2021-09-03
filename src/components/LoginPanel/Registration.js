import React from "react";

const ErrorsList = (props) => {
  let errorsList = props.errorsList.map((error) => (
    <p className={"error"} key={error.message}>
      {error.message}
    </p>
  ));
  return errorsList;
};

class Registration extends React.Component {
  state = {
    name: "",
    surname: "",
    email: "",
    password: "",
    password2: "",
    errorsList: "",
    message: "",
  };
  handleRegistrationChange = (e) => {
    const type = e.target.type;
    const name = e.target.name;
    if (
      type === "text" ||
      type === "email" ||
      type === "password" ||
      type === "password2"
    ) {
      const value = e.target.value;
      this.setState({
        [name]: value,
      });
    } else if (type === "checkbox") {
      const checked = e.target.checked;
      this.setState({
        [name]: checked,
      });
    }
  };
  handleRegistrationSubmit = (e) => {
    e.preventDefault();
    const { name, surname, email, password, password2 } = this.state;
    fetch("https://biletyapp.herokuapp.com/users/register", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        surname: surname,
        email: email,
        password: password,
        password2: password2,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          errorsList: data.errors,
          message: data.message,
        });
      });
  };

  render() {
    return (
      <form  className={"loginlabel"} onSubmit={this.handleRegistrationSubmit}>
        <h2>
          Masz już konto?{" "}
          <span className={"reglogbtn"} onClick={this.props.handleSwitchLogReg}>
            Przejdź do Logowania
          </span>
        </h2>

        <label className={"loginlabel"} htmlFor="name">
          Imię:
          <input
            className={"logPanel"}
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleRegistrationChange}
          />
        </label>
        <label className={"loginlabel"} htmlFor="surname">
          Nazwisko:
          <input
            className={"logPanel"}
            type="text"
            id="surname"
            name="surname"
            value={this.state.surname}
            onChange={this.handleRegistrationChange}
          />
        </label>
        <label className={"loginlabel"} htmlFor="email">
          Email:
          <input
            className={"logPanel"}
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleRegistrationChange}
          />
        </label>
        <label className={"loginlabel"} htmlFor="password">
          Hasło:
          <input
            className={"logPanel"}
            type="password"
            id="password"
            name="password"
            value={this.state.password}
            onChange={this.handleRegistrationChange}
          />
        </label>
        <label className={"loginlabel"} htmlFor="password">
          Powtórz hasło:
          <input
            className={"logPanel"}
            type="password"
            id="password2"
            name="password2"
            value={this.state.password2}
            onChange={this.handleRegistrationChange}
          />
        </label>
        <div>
          <button className={"btnform"} type={"submit"}>
            ZAREJESTRUJ
          </button>
        </div>
        <button className={"btnform"} onClick={this.props.handleShowLoginPanel}>
          Zamknij
        </button>
        {this.state.errorsList ? (
          <ErrorsList errorsList={this.state.errorsList} />
        ) : null}
        {this.state.message ? (
          <p className={"newsletterMsg"}>{this.state.message}</p>
        ) : null}
      </form>
    );
  }
}

export default Registration;