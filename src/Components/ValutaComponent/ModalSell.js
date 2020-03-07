import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class ModalSell extends Component {
  componentDidMount() {
    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.3,
      dismissible: false,
      startingTop: "4%",
      endingTop: "14%"
    };
    M.Modal.init(this.Modal, options);
  }

  render() {
    let { Amount, RateBase, RateForeign, NameBase, NameForeign} = this.props;
    return (
      <>
        <button
          className="btn-large red lighten-1 modal-trigger"
          data-target="modal2"
        >
          Sälj
        </button>

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal2"
          className="modal"
        >
          <div className="modal-content">
            <h3>Du sålde:</h3>
            <h3 className="red-text lighten-1">-{RateForeign} {NameForeign}</h3>
            <h3>Att erhålla:</h3>¨
            <h3 className="green-text lighten-1">{Amount} {NameBase}</h3>
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

export default ModalSell;
