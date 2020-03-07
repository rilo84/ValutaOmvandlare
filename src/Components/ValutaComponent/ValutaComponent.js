import React, { Component } from "react";
import GetCurrencyData from "./Repo/GetCurrencyData";
import GetOptions from "./Helpers/GetSelectOptions";
import GetDefaultValues from "./Helpers/GetDefaultValues";
import GetCurrencyCalcVal from "./Helpers/GetCurrencyCalcVal";

class ValutaComponent extends Component {
  state = {
    currencyList: [],
    currencyNameA: null,
    currencyNameB: null,
    currencyRateA: 1,
    currencyRateB: null
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

  render() {
    return (
      <form>
        <div className="container">
          <div className="row">
            <div className="input-field col s6">
              <select className="browser-default center-align" id="FromCurr">
                {GetOptions(this.state.currencyList, this.state.currencyNameA)}
              </select>
            </div>
            <div className="input-field col s6">
              <select className="browser-default center-align" id="ToCurr">
                {GetOptions(this.state.currencyList, this.state.currencyNameB)}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <h3>
                {this.state.currencyRateA} {this.state.currKeyA}
              </h3>
            </div>
            <div className="input-field col s6">
              <h3>
                {this.state.currencyRateB} {this.state.currKeyB}
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input onChange={this.setAmount} type="number"></input>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default ValutaComponent;
