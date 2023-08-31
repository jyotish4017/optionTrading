import React, { useState, useEffect } from 'react';
import OptionChain from './optionChain';
// import Plot from 'react-plotly.js';


function App() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState([]);
  const [pount, setPount] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  console.log(data);

  useEffect(() => {
    calculateAverage(data.filtered?.data);
  }, [data]);

  const calculateAverage = (data) => {
    if (!data) return;

    let total = 0;
    for (let index = 0; index < data.length; index++) {
        total = total + data[index].CE.changeinOpenInterest;
        console.log(total);
        // setCount(CE_sum => [...CE_sum,total]);
    }
    setCount([total]);
    // const CE_CIOP_sum = data.reduce((total, item) => total + item.CE.changeinOpenInterest, 0);
    // const PE_CIOP_sum = data.reduce((total, item) => total + item.PE.changeinOpenInterest, 0);
  };

  console.log("number of count", count.length);

  return (
    <>
        <div className="p-2">
        <pre>{JSON.stringify(data?.filtered, null, 2)}</pre>
        <div> 
            <ul>
                {count.map((number, index) => (
                <li key={index}>{number}</li>
                ))}
            </ul>
        </div>
        <div> PE changeinOpenInterest sum: {pount }</div>
        {/* <div>
            <Plot
            data={[
            {
                x: stockData.map(entry => entry.timestamp), // X-axis values (timestamps)
                y: stockData.map(entry => entry.price), // Y-axis values (stock prices)
                type: 'scatter',
                mode: 'lines+markers',
                marker: { color: 'blue' },
            }
            ]}
            layout={{ title: 'Stock Price Chart' }}
            />
        </div> */}
        <div> {data && <OptionChain jsondata={data} />} </div>
        </div>
    </>
  );
}
App.theme = 'light';
export default App;
