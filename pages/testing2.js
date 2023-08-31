import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Chart from './chart.js';
// import Chart1 from './chart1.js'; 

function App() {
  const [data, setData] = useState([
    {
      id: 'Change in OI',
      data: [
        { x: "09:15", y: 0 },
      ]
    }
  ]);
  const [price, setPrice] = useState([
    {
      id: 'UnderlyingValue',
      data: [
        { x: "09:15", y: 19240 },
      ]
    }
  ]);
  const { theme, setTheme } = useTheme();

  const data1 = [
    {
      x: 1,
      y: 2,
    },
    {
      x:2,
      y:3,
    }
  ]
  console.log(data1);
  

  useEffect(() => {
    // Simulate fetching JSON data that changes every minute
    const fetchData = async () => {
      try {
        console.log("fetching.......");
        const response = await fetch('https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY');
        const jsonData = await response.json();

  //       // Calculating Change in OI DIfference
        let ceOI = 0;
        let peOI = 0;
        Object.values(jsonData?.filtered?.data).forEach((item) => {
            ceOI += item.CE.changeinOpenInterest;
            peOI += item.PE.changeinOpenInterest;
        });

        const currentCEOI = ceOI;
        const currentPEOI = peOI;
        console.log("currentCEOI",currentCEOI);

        const currentTimeStamp = new Date().toLocaleTimeString(); // Add a timestamp
        const timeParts = currentTimeStamp.split(':'); // Split the string at colons
        const hours = timeParts[0]; // First part is the hours
        const minutes = timeParts[1]; // Second part is the minutes
        const timeFormatted = `${hours}:${minutes}`; // Combine hours and minutes
        console.log(timeFormatted);

  //       // change in OI updated
        const newDataPoint = { x: timeFormatted, y: currentCEOI-currentPEOI };
        const updatedData = [...data];
        const lastDataPoint = updatedData[0].data[updatedData[0].data.length-1].y;
        console.log(lastDataPoint,newDataPoint.y);
        if(lastDataPoint!==newDataPoint.y){
            updatedData[0].data.push(newDataPoint);
            setData(updatedData);
        }

        //underlyingValue updated
        console.log(jsonData?.records?.underlyingValue);
        const newDataPoint1 = { x: timeFormatted, y: jsonData?.records?.underlyingValue };
        const updatedData1 = [...price];
        const lastDataPoint1 = updatedData1[0].data[updatedData1[0].data.length-1].y;
        if(lastDataPoint1!==newDataPoint1.y){
            updatedData1[0].data.push(newDataPoint1);
            setPrice(updatedData1);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log(data);
    console.log(price);
    const interval = setInterval(fetchData, 60000); // Fetch data every minute

    return () => clearInterval(interval);
  }, []); // Trigger the effect when changeOI changes

  return (
    <>
      <div>
        <button onClick={() => setTheme('light')}>Light Mode</button>
        <button onClick={() => setTheme('dark')}>Dark Mode</button>
        <button onClick={() => setTheme('red')}>Red Mode</button>
        <button onClick={() => setTheme('pink')}>Pink Mode</button>
        <button onClick={() => setTheme('blue')}>Blue Mode</button>
      </div>
      <div> <Chart data={data} labelx="Time" labely="Change in OI"/> </div>
      <div><br/></div>
      <div> <Chart data={price} labelx="Time" labely="UnderlyingValue" /> </div>
      {/* <div> <Plotly data1={data1} labelx="Time" labely="Change in OI" /> </div> */}
  <div>
      {data.map(series => (
        <div key={series.id}>
          <h3>{series.id}</h3>
          <ul>
            {series.data.map((point, index) => (
              <li key={index}>
                x: {point.x}, y: {point.y}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    </>
  );
}

export default App;
