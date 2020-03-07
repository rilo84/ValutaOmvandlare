import React, { Component } from "react";
import GetCurrencyData from "./Repo/GetCurrencyData";
import GetOptions from "./Helpers/GetSelectOptions";
import GetDefaultValues from "./Helpers/GetDefaultValues";
import GetCurrencyCalcVal from "./Helpers/GetCurrencyCalcVal";
import mainLogo from "../../Images/cash-flow.svg";
import ModalSell from "./ModalSell";
import ModalBuy from "./ModalBuy";

class ValutaComponent extends Component {
  state = {
    currencyList: [],
    currencyNameA: "",
    currencyNameB: "",
    currencyRateA: null,
    currencyRateB: null,
    amount: 1
  };

  componentDidMount() {
    let currencyData = GetCurrencyData("currData");
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

  render() {
    return (
      <>
        <div className="container">
          <h3>
            <img src={mainLogo} alt="logo" className="logo" /> Valutaväxlaren
          </h3>
          <div className="row">
            <div className="input-field col s6">
              <h5>Välj Basvaluta:</h5>
              <select
                value={this.state.currencyNameA}
                onChange={this.handleChange}
                className="browser-default center-align hoverable"
                id="FromCurr"
              >
                {GetOptions(this.state.currencyList, this.state.currencyNameA)}
              </select>
            </div>
            <div className="input-field col s6">
              <h5>Välj köp/sälj valuta:</h5>
              <select
                value={this.state.currencyNameB}
                onChange={this.handleChange}
                className="browser-default center-align hoverable"
                id="ToCurr"
              >
                {GetOptions(this.state.currencyList, this.state.currencyNameB)}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s5">
              <h3>
                {this.state.currencyRateA} {this.state.currencyNameA}
              </h3>
            </div>
            <div className="input-field col s2">
              <h3>=</h3>
            </div>
            <div className="input-field col s5">
              <h3>
                {this.state.currencyRateB} {this.state.currencyNameB}
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <label>Ange belopp</label>
              <input onChange={this.setAmount} type="number"></input>
            </div>
          </div>
        </div>
        <div className="row btn-row">
          <div className="input-field col s4 push-s2">
          <ModalBuy 
                Amount={this.state.amount} 
                NameBase={this.state.currencyNameA} 
                NameForeign={this.state.currencyNameB} 
                RateBase={this.state.currencyRateA}
                RateForeign={this.state.currencyRateB}
                />
          </div>
          <div className="input-field col s4 push-s2">
            <ModalSell
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
