import React, { Component } from "react";
import GetCurrencyData from "./Repo/GetCurrencyData";
import GetOptions from "./Helpers/GetSelectOptions";
import GetDefaultValues from "./Helpers/GetDefaultValues";
import GetCurrencyCalcVal from "./Helpers/GetCurrencyCalcVal";
import swapIcon from "../../Images/exchange.svg";
import ModalBuy from "./ModalBuy";
import Header from "./Header";
import InfoText from "./InfoText";

class ValutaComponent extends Component {

  state = {
    currencyList: [],
    currencyNameA: "",
    currencyNameB: "",
    currencyRateA: null,
    currencyRateB: null,
    amount: 1
  };

  async componentDidMount() {
    let currencyData = await GetCurrencyData("currData");
    let currencyA = GetDefaultValues("SEK", currencyData);
    let currencyB = GetDefaultValues("EUR", currencyData);

    this.setState({
      currencyList: currencyData,
      currencyNameA: currencyA[0],
      currencyNameB: currencyB[0],
      currencyRateA: GetCurrencyCalcVal(currencyA[1], currencyA[1], 1),
      currencyRateB: GetCurrencyCalcVal(currencyA[1], currencyB[1], 1)
    });
  }

  handleChange = e => {
    let currencyA;
    let currencyB;

    if (e.target.id === "FromCurr") {
      currencyA = GetDefaultValues(e.target.value, this.state.currencyList);
      currencyB = GetDefaultValues(
        this.state.currencyNameB,
        this.state.currencyList
      );
    } else if (e.target.id === "ToCurr") {
      currencyB = GetDefaultValues(e.target.value, this.state.currencyList);
      currencyA = GetDefaultValues(
        this.state.currencyNameA,
        this.state.currencyList
      );
    }
    this.setState({
      currencyNameA: currencyA[0],
      currencyNameB: currencyB[0],
      currencyRateA: GetCurrencyCalcVal(
        currencyA[1],
        currencyA[1],
        this.state.amount
      ),
      currencyRateB: GetCurrencyCalcVal(
        currencyA[1],
        currencyB[1],
        this.state.amount
      )
    });
  };

  setAmount = e => {
    let amount = e.target.value;
    
    let currencyA = GetDefaultValues(
      this.state.currencyNameA,
      this.state.currencyList
    );
    document.querySelector(".btn-large").disabled = false;
    if(amount > (currencyA[1]*100000)){
      amount = this.state.amount;
      e.target.value = amount;
      document.querySelector("#labelMsg").textContent="";
      document.querySelector("#errorMsg").textContent = `Max tillåtna belopp är 
      ${(currencyA[1]*100000).toFixed(0)} ${this.state.currencyNameA}`;
    }
    else if(amount <1){
      document.querySelector("#labelMsg").textContent="";
      document.querySelector("#errorMsg").textContent = "Minsta tillåtna belopp är 1";
      document.querySelector(".btn-large").disabled = true;
    }
    else{
      document.querySelector("#labelMsg").textContent="Ange belopp att handla med"
      document.querySelector("#errorMsg").textContent = "";
    }
    let currencyB = GetDefaultValues(
      this.state.currencyNameB,
      this.state.currencyList
    );
    this.setState({
      amount: amount,
      currencyRateA: GetCurrencyCalcVal(currencyA[1], currencyA[1], amount),
      currencyRateB: GetCurrencyCalcVal(currencyA[1], currencyB[1], amount)
    });
  };

  swapCurrency = () =>{
    let currencyA = GetDefaultValues(
      this.state.currencyNameA,
      this.state.currencyList
    );
    let currencyB = GetDefaultValues(
      this.state.currencyNameB,
      this.state.currencyList
    );
    this.setState({
      currencyNameA: currencyB[0],
      currencyNameB: currencyA[0],
      currencyRateA: GetCurrencyCalcVal(currencyB[1], currencyB[1], this.state.amount),
      currencyRateB: GetCurrencyCalcVal(currencyB[1], currencyA[1], this.state.amount)
    });
  }

  render() {
    return (
      <>
        <div className="container">
          <Header />
          <div className="row currContainer">
            <div className="input-field col s5">
              <h5 className="choiceText">Välj säljvaluta:</h5>
              <select
                value={this.state.currencyNameA}
                onChange={this.handleChange}
                className="browser-default center-align hoverable"
                id="FromCurr"
              >
                {GetOptions(this.state.currencyList)}
              </select>
            </div>
            <div className="col s2 imgContainer">
              <img onClick={this.swapCurrency} src={swapIcon} alt="icon" className="icon" />
            </div>
            <div className="input-field col s5">
              <h5 className="choiceText">Välj köpvaluta:</h5>
              <select
                value={this.state.currencyNameB}
                onChange={this.handleChange}
                className="browser-default center-align hoverable"
                id="ToCurr"
              >
                {GetOptions(this.state.currencyList)}
              </select>
            </div>
          </div>
          <div className="row currTextContainer">
            <div className="input-field col s12 m5 currTextCol">
              <InfoText text={`${this.state.currencyRateA} ${this.state.currencyNameA}`} />
            </div>
            <div className="input-field col s12 m2 currTextCol">
            <InfoText text="=" />
            </div>
            <div className="input-field col s12 m5 currTextCol">
              <InfoText text={`${this.state.currencyRateB} ${this.state.currencyNameB}`} />
            </div>
          </div>
          <div className="row amountRow">
            <div className="input-field col s12">
              <label htmlFor="amountField" id="labelMsg">Ange belopp att handla med</label>
              <label id="errorMsg" className="red-text"></label>
              <input id="amountField" onChange={this.setAmount} type="number" min="1" max="100000"></input>
            </div>
          </div>
        </div>
        <div className="row btn-row">
          <div className="input-field col s8 push-s2 m6 push-m3">
          <ModalBuy 
                Amount={this.state.amount} 
                NameBase={this.state.currencyNameA} 
                NameForeign={this.state.currencyNameB} 
                RateBase={this.state.currencyRateA}
                RateForeign={this.state.currencyRateB}
                />
          </div>
        </div>
      </>
    );
  }
}

export default ValutaComponent;
