import React from 'react';

const GetOptions = (list,defaultCurr) =>{
    let options = list.map(c => {
        let key = c[0];
        return <option key={key} value={key}>{key}</option>
      });

      return options;
}

export default GetOptions;