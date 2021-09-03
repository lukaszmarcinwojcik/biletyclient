import React from "react";
// import moment from "moment";
import "./FlightBooking.css";
import Seat from "./Seat"


class FlightBooking extends React.Component {
  state = {
    startDate: "",
    minStartDate: "",
    maxStartDate:"",
    returnDate: "",
    minReturnDate: "",

    arrivalWeather: null,
    arrivalWeatherTemp: null,
    arrivalWeatherType:null,
    arrivalWeatherImg: null,

    departureWeather: null,
    departureWeatherTemp: null,
    departureWeatherType: null,
    departureWeatherImg: null,

    departure: "",
    arrival: "",
    twoWayTicket: false,
    extraBaggage: false,

    seatList:[],
    flightData: [],
    ticketPrice: 0,
    reservedSeatList:[],

    currency: "PLN",
    currencyValue: 1,

    maxNumberOfPassenger: 1,
    selectedNumberOfPassenger:0,
    isActiveFindFlight: true,
    isActiveSeatSelection: false,
    isActiveSummarySection:false,
    isActivePaymentSection:false,
  };
  componentDidMount() {
    this.setStartDate();
    this.setReturnDate();
    this.getSeatList();
  }
  getFlightData = (e) => {
    e.preventDefault();
    
    if(this.state.departure===""||this.state.arrival==="")
    {
      alert("Proszę wybrac miejsce wylotu i przylotu")
      return
    }
    if(this.state.departure===this.state.arrival)
    {
      alert("Nie ma takich lotów")
      return
    }
    fetch("https://biletyapp.herokuapp.com/flightfind", {
      method: "POST",
      body: JSON.stringify({
        departure: this.state.departure,
        arrival: this.state.arrival,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          flightData: data,
          isActiveFindFlight: false,
          isActiveSeatSelection: true,
          isActiveSummarySection: false,
          isActivePaymentSection: false,
        });
      });

  };
  getSeatList=()=>{
    fetch("https://biletyapp.herokuapp.com/seat", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          seatList: data,
        });
      });
      
  };

  setStartDate = () => {
    let currentDate = new Date();
    let dd = currentDate.getDate();
    let mm = currentDate.getMonth()+1;
    let yyyy = currentDate.getFullYear();
    let yyyyMax = yyyy + 1;
    if (dd < 10) {
      dd = "0" + dd
    }
    if (mm < 10) {
      mm = "0" + mm
    }
    let maxStartDate=`${yyyyMax}-${mm}-${dd}`
    let startDate= `${yyyy}-${mm}-${dd}`
    this.setState({
      startDate: startDate,
      minStartDate: startDate,
      maxStartDate: maxStartDate,
    })
  };
  setReturnDate = () => {
    let currentDate = new Date();
    let dd = currentDate.getDate()+1;
    let mm = currentDate.getMonth()+1;
    let yyyy = currentDate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd
    }
    if (mm < 10) {
      mm = "0" + mm
    }
    let returnDate= `${yyyy}-${mm}-${dd}`
    
    this.setState({
      returnDate: returnDate,
      minReturnDate: returnDate,

    })
  };

  handleStartDateChange = (e) => {
    
    const value = e.target.value;
      // let day = new Date(value);
      // let dd = day.getDate();
      // let mm = day.getMonth();
      // let yyyy = day.getFullYear();
      // let minReturnDate = `${yyyy}-${mm}-${dd}`;

      this.setState({
        startDate: value,
        returnDate: value,
        minReturnDate: value,
      });
  };
  
  handleReturnDateChange = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;

      this.setState({
        [name]: value,
      });
    };

    handleSelectArrivalCity = (e)=> {
      const name = e.target.name;
      const value = e.target.value;

      this.setState({
        [name]: value,
      });
      if(value===""){
        return
      }

      let getWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=35d619a1807b5147986aba2eba029146`

      fetch(getWeatherLink)
      .then((resp) => resp.json())
      .then((data) => {
        
        let temp=(data.main.temp-273.15).toFixed()
        // console.log("pogoda: ", data,"temperatura: ",temp, "pogoda: ", data.weather[0].main)

        let iconcode= data.weather[0].icon;

        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        this.setState({
          arrivalWeather: data,
          arrivalWeatherTemp: temp,
          arrivalWeatherType: data.weather[0].main,
          arrivalWeatherImg: iconurl,
        });
        
      });
    }

    
    handleSelectDepartureCity = (e)=> {
      const name = e.target.name;
      const value = e.target.value;

      this.setState({
        [name]: value,
      });
      if(value===""){
        return
      }

      let getWeatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=35d619a1807b5147986aba2eba029146`

      fetch(getWeatherLink)
      .then((resp) => resp.json())
      .then((data) => {
        
        let temp=(data.main.temp-273.15).toFixed()
        // console.log("pogoda: ", data,"temperatura: ",temp, "pogoda: ", data.weather[0].main)
        
        let iconcode= data.weather[0].icon;

        let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
       
        this.setState({
          departureWeather: data,
          departureWeatherTemp: temp,
          departureWeatherType: data.weather[0].main,
          departureWeatherImg: iconurl,
        });
      });

    }

  handleTicketWayChange = (e)=>{
    const checked = e.target.checked;
      this.setState({
        twoWayTicket: checked,
      });
  }
  handleAddExtraBaggage = (e)=>{
    const checked = e.target.checked;
      this.setState({
        extraBaggage: checked,
      });
  }
  handleNumberOfPassengerSelect=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleCurrecyChange = (e)=> {
    const name = e.target.name;
    const value = e.target.value;

    if(value==="PLN"){
      this.setState({
        currency: "PLN",
        currencyValue: 1,
      });
      return
    }
    let getCurrencyLink = `https://api.nbp.pl/api/exchangerates/rates/C/${value}/?format=json`

    fetch(getCurrencyLink, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        
        this.setState({
          currencyValue: data.rates[0].ask,
        });
      });

    this.setState({
      [name]: value,
    });
  }

  
// TU BEDZIE FUNKCJA DODAWAC I ODEJMOWAC MIEJSCA ZAREZERWOWANE
  handleSelectSeatChange =(e)=>{
    const value = e.target.value;
 
    
    let selectedNumberOfPassenger=this.state.selectedNumberOfPassenger;
    let reservedSeatList =this.state.reservedSeatList;
    if(reservedSeatList.includes(value)){
      alert("usunięto miejsce")
      let index = reservedSeatList.indexOf(value);
      reservedSeatList.splice(index, 1);
      selectedNumberOfPassenger-=1;
      this.setState({
        reservedSeatList: reservedSeatList,
        selectedNumberOfPassenger: selectedNumberOfPassenger,
      });
      return;
    }
    
    
    if(this.state.maxNumberOfPassenger<=this.state.selectedNumberOfPassenger){
      alert("Wszystkie miejsca są juz wybrane")
      return
    }
    alert("dodano miejsce", value)
    reservedSeatList.push(value)
    selectedNumberOfPassenger+=1;
    // console.log("tablicu po dodaniu",reservedSeatList);
    // console.log("liczba pasazerow wybranych:",selectedNumberOfPassenger);
    // console.log("licczba mx pasazerow",this.state.maxNumberOfPassenger)
    this.setState({
      reservedSeatList: reservedSeatList,
      selectedNumberOfPassenger: selectedNumberOfPassenger,
    });
  }
  backToFlightFind=()=>{
    this.setState({
      isActiveFindFlight: true,
      isActiveSeatSelection: false,
      isActiveSummarySection: false,
      isActivePaymentSection:false,
      
      });
  }
  backToSeatSelect=()=>{
    this.setState({
      isActiveFindFlight: false,
      isActiveSeatSelection: true,
      isActiveSummarySection: false,
      isActivePaymentSection:false,
      
      });
  }
  goToPayment=(e)=>{
    if(this.state.maxNumberOfPassenger!=this.state.selectedNumberOfPassenger){
      alert("Proszę wybrać wszystkie miejsca")
      return
    }

    let ticketPrice=this.state.selectedNumberOfPassenger*this.state.flightData.price
    if(this.state.twoWayTicket){
      ticketPrice=ticketPrice*2;
    }
    if(this.state.extraBaggage){
      ticketPrice+=this.state.flightData.extraBaggagePrice;
    }

    this.setState({
    isActiveFindFlight: false,
    isActiveSeatSelection: false,
    isActiveSummarySection: true,
    isActivePaymentSection:false,
    ticketPrice: ticketPrice,
    });
  }
  handlePaymentSubmit=()=>{
    let islogged=window.localStorage.getItem('islogged');
    // console.log(islogged)
    if(islogged){

      this.setState({
        isActiveFindFlight: false,
        isActiveSeatSelection: false,
        isActiveSummarySection: false,
        isActivePaymentSection: true,
      });
      return;
    }
    alert("Aby przejsc do płatności musisz się zalogować")
    this.props.handleShowLoginPanel();
    return;

  }

  findNextFlight=()=>{
    this.setState({
      isActiveFindFlight: true,
      isActiveSeatSelection: false,
      isActiveSummarySection: false,
      isActivePaymentSection: false,
    });
    window.location.reload(true);

  }
  render() {
   

    const seatList= this.state.seatList.map((seat) => (
    <Seat key={seat._id} name={seat.name} isActive={false} isTaken={seat.isTaken} extraBaggage={false} price={500} handleSelectSeatChange={this.handleSelectSeatChange} reservedSeatList={this.state.reservedSeatList}/> ));
    

    let reservedSeatList = this.state.reservedSeatList.map((seat)=>(<label key={seat}>{`${seat}, `}</label>));
    
    
    return (
      <div className={"FlightBooking"}>

        {/* =========================================  Sekcja nr1 Wybór LOTU  ====================================  */}
        {this.state.isActiveFindFlight?
        (<section className="findFlight">
        <form >
            <h2>
              Szukaj lotu
            </h2>
            <div className="selectCity">
                  <label className={"departureCityLabel"} htmlFor="departureCity">Miejsce wylotu:</label>
                  <select className="departureCitySelect" form="departureCity"
                  value={this.state.departure}
                  name={"departure"}
                  onChange={this.handleSelectDepartureCity}>
                  <option value=""> -----wybierz-----</option>
                  <option value="Kraków">Kraków</option>
                  <option value="Warszawa">Warszawa</option>
                  <option value="Tokio">Tokio</option>
                  <option value="Paryż">Paryż</option>
                  </select>

                  <label className={"arrivalCity"} htmlFor="arrivalCity">Miejsce przylotu:</label>
                  <select className="arrivalCitySelect" form="arrivalCity"
                  value={this.state.arrival}
                  name={"arrival"}
                  onChange={this.handleSelectArrivalCity}>
                  <option value=""> -----wybierz-----</option>
                  <option value="Kraków">Kraków</option>
                  <option value="Warszawa">Warszawa</option>
                  <option value="Tokio">Tokio</option>
                  <option value="Paryż">Paryż</option>
                  </select>
              </div>
            
            <div className="twoWayTicket">
              <label className="twoWayTicketLabel">
              <input
                    className="twoWayTicketInput"
                    type="checkbox"
                    id="twoWayTicket"
                    name="twoWayTicket"
                    checked={this.state.ticketWay}
                    onChange={this.handleTicketWayChange}
                  />
                  lot w 2 strony
              </label>
            </div>
            <div className={"departureArrivalDate"}>

              <label className={"departureTimeLabel"} htmlFor="start">Data wylotu:</label>
              <input
                className="departureTimeInput" 
                type="date"
                id="startDate"
                name="startDate"
                value={this.state.startDate}
                onChange={this.handleStartDateChange}
                min={this.state.minStartDate}
                max={this.state.maxStartDate}
              />
             {this.state.twoWayTicket?
              (<label className={"arrivalDate"}>
              <label htmlFor="return">Data powrotu:</label>
              <input 
                className="arrivalTimeInput" 
                type="date"
                id="returnDate"
                name="returnDate"
                value={this.state.returnDate}
                onChange={this.handleReturnDateChange}
                min={this.state.minReturnDate}
                max={this.state.maxStartDate}
              />
              </label>):null}
            </div>
            <div className={"weatherDiv"}>
           
              {this.state.departureWeather===null?null:
              (<div className={"departureWeatherDiv"}>
                <div className={"weatherInfo"}>
                <p>{`Pogoda ${this.state.departure}`}</p> 
                  <p>{`Temperatura: ${this.state.departureWeatherTemp} C`}</p>
                  <p>{this.state.departureWeatherType}</p>
                </div>
                <div className={"weatherImgDiv"}>
                <img
                  className={"weatherImg"}
                  src={this.state.departureWeatherImg}
                  alt={this.state.departureWeatherType}
                  />
                </div>
              </div>)}
              {this.state.arrivalWeather===null?null:
              (<div className={"arrivalWeatherDiv"}>
                <div className={"weatherInfo"}>
                  <p>{`Pogoda ${this.state.arrival}`}</p>
                  <p>{`Temperatura: ${this.state.arrivalWeatherTemp} C`}</p>
                  <p>{this.state.arrivalWeatherType}</p>
                </div>
                <div className={"weatherImgDiv"}>
                  <img
                  className={"weatherImg"}
                  src={this.state.arrivalWeatherImg}
                  alt={this.state.arrivalWeatherType}
                  />
                </div>
              </div>)}
                
            </div>
           
            <button 
              className={"btnFind"} 
              onClick={this.getFlightData}>
              Szukaj
            </button>
          </form>
        </section>):null}

        {/*=========================== Sekcja nr2 Wybór miejsca ===============================   */}
        {this.state.isActiveSeatSelection?
        (<section className="seatSelectionSection">
          <h2>
              Wybierz miejsce
          </h2>
          <div className={"seatLabel"}><label>Lot z {this.state.departure} do {this.state.arrival} {this.state.twoWayTicket?" w dwie strony":" w jedna stronę"}</label></div>

          <div className={"seatLabel"}><label >Data wylotu: {this.state.startDate}</label></div>
          <div className={"seatLabel"}><label  htmlFor="arrivalTime">Wybierz godzinę wylotu:</label>
              <select className={"dateOfArrival" } id="arrivalTime" form="arrivalTime"> 
                <option value={this.state.flightData.departureTime}>{this.state.flightData.departureTime}</option>
              </select>
          </div> 
            
            {this.state.twoWayTicket? 
            (
            <div>
              <div className={"seatLabel"}><label >Data powrotu: {this.state.returnDate}</label></div>
              <div className={"seatLabel"}><label  htmlFor="arrivalTime">Wybierz godzinę powrotu:</label>
              <select className={"dateOfArrival" } id="arrivalTime" form="arrivalTime"> 
                <option value={this.state.flightData.arrivalTime}>{this.state.flightData.arrivalTime}</option>
              </select>
              </div> 
            </div>
            ):null  
          }



          <div className={"seatLabel"}>
            <label >Dodatkowy bagaż
              <input
                    className={"extraBaggageInput"}
                    type="checkbox"
                    id="extraBaggage"
                    name="extraBaggage"
                    checked={this.state.extraBaggage}
                    onChange={this.handleAddExtraBaggage}
                  />
            </label>
          </div>
          <div className={"seatLabel"}>
            <label htmlFor="numberOfPassenger">Wybierz ilość pasażerów:</label>
                  <select className={"maxNumberOfPassenger"} id="maxNumberOfPassenger" form="maxNumberOfPassenger"
                  // value={this.state.arrival}
                  name={"maxNumberOfPassenger"}
                   onChange={this.handleNumberOfPassengerSelect}
                  >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  </select>
          </div>
          <div className={"seatLabel"}>
            <label>{`Wybrano ${this.state.selectedNumberOfPassenger} z ${this.state.maxNumberOfPassenger} miejsc`}</label>
          </div>
          {/* <div>Miejsca: {this.state.reservedSeatList?(reservedSeatList):null} </div> */}
          <div className={"seatLabel"}>
            <label >Miejsca: {this.state.selectedNumberOfPassenger?reservedSeatList:null} </label>
          </div>

          <button 
              className={"btnFind"} 
              onClick={this.backToFlightFind}>
              Wstecz
            </button>
          <button className={"btnFind"} onClick={this.goToPayment}>Przejdź do płatności</button>
          <div className="airplane">
            <div className="container">
           {seatList}
            </div>
          </div>
        </section>):null}
        {/* ==================================================SEKCJA WYBORU PLATNOSCI================================================ */}
        {this.state.isActiveSummarySection?(
        <section className="summarySection">
          <h2>Wybierz płatność</h2>
          <div className={"seatLabel"}>
            <label>Lot z {this.state.departure} do {this.state.arrival} {this.state.twoWayTicket?" w dwie strony":" w jedna stronę"}</label>
          </div>
          <div className={"seatLabel"}>Data wylotu  {this.state.startDate} godzina: {this.state.flightData.departureTime}</div>
          {this.state.twoWayTicket?

          (<div className={"seatLabel"}>Data powrotu {this.state.returnDate} godzina:  {this.state.flightData.arrivalTime}</div>):null}
          <div className={"seatLabel"}>Dodatkowy bagaż: {this.state.extraBaggage?"Tak":"Nie"}</div>
          
          <div className={"seatLabel"}>Ilość pasażerów: {this.state.maxNumberOfPassenger} </div>
          <div className={"seatLabel"}>Miejsca: {reservedSeatList}</div>

          <div className={"seatLabel"}>
            <label htmlFor="currency">{`Do zapłaty: ${(this.state.ticketPrice/this.state.currencyValue).toFixed(2)}`}</label>
                    <select className={"selectCurrency"} id="currency" form="currency"
                    name={"currency"}
                    onChange={this.handleCurrecyChange}>
                    <option value="PLN">PLN</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                    <option value="JPY">JPY</option>
                    </select>
          </div>
          {this.state.currency!=="PLN"?<div className={"seatLabel"}>{`Aktualny kurs ${this.state.currency} to: ${this.state.currencyValue}`}</div>:null}
          <button 
              className={"btnFind"} 
              onClick={this.backToSeatSelect}>
              Wstecz
            </button>
          <button className={"btnFind"} onClick={this.handlePaymentSubmit}>
            Zapłać
          </button>


          </section>):null}
          {this.state.isActivePaymentSection?(
          <section className={"paymentSection"}>
            <h2>Dziękujemy za skorzystanie z naszych usług</h2>
            <button 
              className={"btnFind"} 
              onClick={this.findNextFlight}>
              Zarezerwuj następny lot
            </button>
          </section>):null}
         

      </div>
        
    );
  }
}
export default FlightBooking;