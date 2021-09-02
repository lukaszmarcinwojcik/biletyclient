import React from "react";
import "./Seat.css";



class Seat extends React.Component {
    state = {
        isTaken:false,
        isActive: false,
        klasa: "seat",
        name: null,
    };
    componentDidMount() {
        this.setState({
            isTaken: this.props.isTaken,
            isActive: this.props.isActive,
            klasa: "seat",
            name: this.props.name
          })
          if(this.props.isTaken){
            this.setState({
              klasa: "isTaken",
            })
          }
      }
    
    handleClick = (e) => {
      
      if(this.props.isTaken){
        alert("To miejsce jest zajęte :(");
        return;
      }
      this.props.handleSelectSeatChange(e)
    };


  render() {
    return (
        <button key={this.props._id} 
        onClick={this.handleClick}
        value={this.props.name} 
        className={this.state.klasa}
        >
        </button>
    );
  }
}
export default Seat;