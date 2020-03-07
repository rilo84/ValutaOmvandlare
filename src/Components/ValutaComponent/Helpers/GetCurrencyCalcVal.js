const GetCurrencyCalcVal = (valA, valB, amount) =>{
    return ((valB/valA)*amount).toFixed(2);
}

export default GetCurrencyCalcVal;