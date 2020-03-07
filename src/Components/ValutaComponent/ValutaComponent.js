import React, { Component } from "react";
import GetCurrencyData from "./Repo/GetCurrencyData";
import GetOptions from "./Helpers/GetSelectOptions";

class ValutaComponent extends Component {
  state = {
    currencyList: [],
    currencyNameA:null,
    currencyNameB:null,
    currencyRateA:null,
    currencyRateB:null

  };

  componentDidMount() {
    let currencyData = GetCurrencyData("currData");
    this.setState({ currencyList: currencyData , currencyNameA:'SEK', currencyNameB:'EUR' });
  }

  render() {
    return (
          <form>
            <div className="container">
              <div className="row">
                <div className="input-field col s6">
                  <select
                    className="browser-default center-align"
                    id="FromCurr"
                  >
                    {GetOptions(this.state.currencyList, this.state.currencyNameA)}
                  </select>
                </div>
                <div className="input-field col s6">
                  <select
                    className="browser-default center-align"
                    id="ToCurr"
                  >
                    {GetOptions(this.state.currencyList, this.state.currencyNameB)}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <h3>
                    {this.state.currValA} {this.state.currKeyA}
                  </h3>
                </div>
                <div className="input-field col s6">
                  <h3>
                    {this.state.currValB} {this.state.currKeyB}
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
