import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

function Testing() {
  const [data, setData] = useState([]);
  const [ceChangeInOI, setCEChangeInOI] = useState([]);
  const [peChangeInOI, setPEChangeInOI] = useState([]);
  const [times, setTimes] = useState([]);
//   const [count, setCount] = useState([0]);

  const ceoi = [];
  const peoi = [];
  const count = [];
  count.push(0);
  
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Fetch data every minute
    return () => clearInterval(interval); // Clean up on unmount
    // calculateAverage(data?.filtered?.data);
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY'); // Replace with your API URL
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

//   useEffect(() => {
//     calculateAverage(data?.filtered?.data);
//     // timeFilter(data?.records);
//   }, []);

  const calculateAverage = (data) => {
    if (!data) return;

    let ceTotal = 0;
    let peTotal = 0;
    
    // const ceAccumulated = [];
    // const peAccumulated = [];

    for (let index = 0; index < data.length; index++) {
      ceTotal += data[index].CE.changeinOpenInterest;
      peTotal += data[index].PE.changeinOpenInterest;

    //   ceAccumulated.push(ceTotal);
    //   peAccumulated.push(peTotal);
    }

    ceoi.push(ceTotal);
    peoi.push(peTotal);
    count.push(count[count.length-1] + 1);

    // setCEChangeInOI(ceAccumulated[data.length-1]);
    // setPEChangeInOI(peAccumulated[data.length-1]);
    // console.log(ceAccumulated[data.length-1]);
    // console.log(peAccumulated[data.length-1]);
  };
  // Extract x and y values from data for plotting
  const xValues = count.map(item => item); // Replace with your data structure
  const yValues = ceoi.map(item => item.value); // Replace with your data structure
  console.log(count);
  console.log(ceoi);
  console.log("peoi",peoi);

  return (
    <div className="p-2">
      {/* Plot the graph using Plotly.js */}
      <Plot
        data={[
          { x: xValues, y: yValues, type: 'scatter', mode: 'lines+markers', marker: { color: 'blue' } }
        ]}
        layout={{ title: 'Real-Time Data Plot' }}
      />
    </div>
  );
}

export default Testing;
