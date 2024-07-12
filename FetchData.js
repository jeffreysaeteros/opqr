const DataAPI = async () => {
    try {
        let data = await fetch(
            "https://sheets.googleapis.com/v4/spreadsheets/1JRuBHqzaR8numxNJdVGwEKEonCH4J12pkmlO-Oxf4rk/values/sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyA0El-Oj9p-r-ZLGFZJ2-yOIdj4jA9azQ0"
        );
        let { values } = await data.json();
        let [, ...Data] = values.map((data) => data);
        console.log(Data)
        return Data;
    } catch {
        console.log("Error");
    }
};
export default DataAPI;