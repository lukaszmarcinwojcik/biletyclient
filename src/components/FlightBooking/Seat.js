import React from "react";
import "./Seat.css";



class Seat extends React.Component {
    state = {
        isActive: false,
        klasa: "seat",
        name: null,
    };
    componentDidMount() {
        this.setState({
            isActive: this.props.isActive,
            klasa: "seat",
            name: this.props.name
      
          })
        // this.setStartDate();
        // this.setReturnDate();
      }
    
    handleClick = (e) => {
        const value = e.target.value;
        console.log(this.props.name);
        alert("klik "+this.props.name);
    
    // const name = e.target.name;
    // const value = e.target.value;
    // console.log("w return: ",name, value)

  

    //   this.setState({
    //     [name]: value,
    //   });
    };


  render() {
    return (
        <div onClick={this.handleClick} isActive={this.state.isActive} className={this.state.klasa}>
        </div>
    );
  }
}
export default Seat;