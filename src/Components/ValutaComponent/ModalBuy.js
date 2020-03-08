import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class ModalBuy extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.3,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };
    M.Modal.init(this.Modal, options);
  }

  render() {
    let { Amount, RateBase, RateForeign, NameBase, NameForeign} = this.props;
    return (
      <>
      <button
          disabled
          className="btn-large green lighten-1 modal-trigger"
          data-target="modal1"
        >
          Bekräfta Köp
        </button>
        
        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          <div className="modal-content">
            <h3>Du köpte:</h3>
            <h3 className="green-text lighten-1">{RateForeign} {NameForeign}</h3>
            <h3>Att betala:</h3>
            <h3 className="red-text lighten-1">-{Amount} {NameBase}</h3>
            <h5>Växelkurs: {(RateBase/RateForeign).toFixed(2)}</h5>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat">
              OK
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ModalBuy;
