import React from 'react';
import mainLogo from '../../Images/cash-flow.svg'

function Header() {
  return (
    <>
      <h3 className="headerText">
        <img src={mainLogo} alt="logo" className="logo" /> Valutaväxlaren
      </h3>
    </>
  );
}

export default Header;
