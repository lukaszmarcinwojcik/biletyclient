import './NavBar.css';
import React from 'react';

class NavBar extends React.Component {
  state = {
    
  };
    render(){
    return (
      <nav className="navbar">
      <h2 className="titlenav">Rezerwacja biletów</h2>
    
      <div
        className={"loginbtn"}
        onClick={this.props.handleShowLoginPanel}
      ></div>
    </nav>
    );
  };
};

export default NavBar;