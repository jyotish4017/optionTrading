import React, { useState, useEffect } from 'react';
import OptionChain from './optionChain';
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })

function Home1() {
  const [data, setData] = useState([]);
  const [ceChangeInOI, setCEChangeInOI] = useState([]);
  const [peChangeInOI, setPEChangeInOI] = useState([]);
  const [times, setTimes] = useState([]);
  const [count, setCount] = useState(0);
//   time

  useEffect(() => {
    fetchData();
    console.log(data);
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

  useEffect(() => {
    calculateAverage(data?.filtered?.data);
    timeFilter(data?.records);
  }, [data]);

  const calculateAverage = (data) => {
    if (!data) return;

    let ceTotal = 0;
    let peTotal = 0;
    
    const ceAccumulated = [];
    const peAccumulated = [];

    for (let index = 0; index < data.length; index++) {
      ceTotal += data[index].CE.changeinOpenInterest;
      peTotal += data[index].PE.changeinOpenInterest;

      ceAccumulated.push(ceTotal);
      peAccumulated.push(peTotal);
    }

    setCEChangeInOI(ceAccumulated[data.length-1]);
    setPEChangeInOI(peAccumulated[data.length-1]);
    console.log(ceAccumulated[data.length-1]);
    console.log(peAccumulated[data.length-1]);
  };

  const timeFilter = (data) => {
    if (!data) return;

    // let ceTotal = 0;
    // let peTotal = 0;
    let timestamptime = "";
    
    // const ceAccumulated = [];
    // const peAccumulated = [];
    const timestamptimeAccumulated = [];

    for (let index = 0; index < data.length; index++) {
    //   ceTotal += data[index].CE.changeinOpenInterest;
    //   peTotal += data[index].PE.changeinOpenInterest;
      timestamptime = data[index].timestamp;

    //   ceAccumulated.push(ceTotal);
    //   peAccumulated.push(peTotal);
      timestamptimeAccumulated.push(timestamptime);
    }

    // setCEChangeInOI(ceAccumulated);
    // setPEChangeInOI(peAccumulated);
    setTimes(timestamptimeAccumulated);
  };

  return (
    <div className="p-2">
      <pre>{JSON.stringify(data?.filtered?.data[0], null, 2)}</pre>
      
      {/* Plot the graph using Plotly.js */}
      <div>
        <Plot
          data={[
            { x: ceChangeInOI, y: peChangeInOI, type: 'scatter', mode: 'lines+markers', marker: { color: 'blue' } }
          ]}
          layout={{ title: 'Change in Open Interest (CE vs. PE)' }}
        />
        {/* <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      /> */}
      </div>
      
      <div>
        <ul>
          {ceChangeInOI.map((ceValue, index) => (
            <li key={index}> {index} : CE Change in Open Interest: {ceValue}, PE Change in Open Interest: {peChangeInOI[index]}</li>
          ))}
        </ul>
      </div>
      
      {/* <div> {data && <OptionChain jsondata={data} />} </div> */}
    </div>
  );
}

export default Home1;
