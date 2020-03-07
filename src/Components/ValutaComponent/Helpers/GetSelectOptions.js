import React from 'react';

const GetOptions = (list,defaultCurr) =>{
    let options = list.map(c => {
        let key = c[0];
        let val = c[1];
        if(key === defaultCurr){
          return <option selected="selected" key={key} value={(val)}>{key}</option>
        }
        return <option key={key} value={(val)}>{key}</option>
      });

      return options;
}

export default GetOptions;