const GetCurrencyData = async name => {
  if (localStorage.getItem(name) == null || localStorage.getItem("expireTime") < Date.now()) {
    await fetch(
      "https://openexchangerates.org/api/latest.json?app_id=64fac555f7e243f5a84efec0066dfa94"
    )
      .then(res => res.json())
      .then(data => {
        let currentTime = new Date().getTime();
        let expireTime = currentTime + 3600000;
        
        localStorage.setItem("expireTime", expireTime);
        localStorage.setItem(name, JSON.stringify(data.rates));
        console.log("Hämtade ny data från API");
        // return Object.entries(data.rates);
      });
  } 
    let storedData = localStorage.getItem(name);
    let data = Object.entries(JSON.parse(storedData));
    let remainingMinutes = (localStorage.getItem("expireTime") - Date.now()) / 60000;
    console.log(`Hämtade lagrad data.`);
    console.log(`Tid till nästa updatering: \n${remainingMinutes.toFixed(0)} minuter`);
    
    return data;
  
};

export default GetCurrencyData;
