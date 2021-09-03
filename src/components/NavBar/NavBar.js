import './NavBar.css';
import React from 'react';

class NavBar extends React.Component {
  state = {
    
  };
  backToHomePage = ()=>{
    window.location.reload(true);
  }
    render(){
    return (
      <nav className="navbar">
      <div className={"titleNavDiv"} onClick={this.backToHomePage}>
        <h2  className="titlenav">Rezerwacja biletów</h2>
      </div>
      <div
        className={"loginbtn"}
        onClick={this.props.handleShowLoginPanel}
      ></div>
    </nav>
    );
  };
};

export default NavBar;