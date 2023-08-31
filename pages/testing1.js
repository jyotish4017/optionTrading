import { useEffect, useState, CSSProperties } from "react";

const App = () => {
  const [optionData, setOptionData] = useState({});
  const [peSUM, setPeSUM] = useState([]);
  const [ceSUM, setCeSUM] = useState([]);

  useEffect(() => {
    setInterval(() => {
      console.log("Fetching!");
      fetch(
        "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
      ).then((res) =>
        res.json().then((d) =>
          setOptionData({
            ...d?.filtered?.data,
            // data: d.data?.map((row) => ({ ...row, key: row.StrikePrice })),
          })
        )
      );
    }, 30000);
  }, []);

  const calculateOpenInterestSum = () => {
    let peOI = 0;
    let ceOI = 0;

    Object.values(optionData).forEach((item) => {
      peOI += item.PE.changeinOpenInterest;
      ceOI += item.CE.changeinOpenInterest;
    });

    setPeSUM((prevPeSUM) => [...prevPeSUM, peOI]);
    setCeSUM((prevCeSUM) => [...prevCeSUM, ceOI]);

    console.log("ceSUM", ceOI);
    console.log("peSUM", peOI);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Calculating!");
      calculateOpenInterestSum();
    }, 30001);

    return () => clearInterval(interval);
  }, []);

//   console.log(JSON.stringify(optionData,null,2));
  console.log(optionData);
  console.log("ceSUM", ceSUM);

  return (
    <>
    <div className="p-2">
      <table>
        <thead>
          <tr>
            <th>Strike Price</th>
            <th>PE changeinOpenInterest</th>
            <th>CE changeinOpenInterest</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(optionData).map((item, index) => (
            <tr key={index}>
              <td>{item.strikePrice}</td>
              <td>{item.PE.changeinOpenInterest}</td>
              <td>{item.CE.changeinOpenInterest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
        hello: <br/> 
        <div className="p-2">
            <table>
                <thead>
                <tr>
                    <th>Strike Price</th>
                    <th>CE changeinOpenInterest SUM</th>
                    <th>PE changeinOpenInterest SUM</th>
                </tr>
                </thead>
                <tbody>
                {ceSUM && ceSUM.map((item, index) => (
                    <tr key={index}>
                    <td>{item}</td>
                    {/* <td>{item.PE.changeinOpenInterest}</td> */}
                    {/* <td>{item.CE.changeinOpenInterest}</td> */}
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
    </div>
    </>
  );
};

export default App;

  // {[{ id: 'CEOI', color: "hsl(234, 70%, 50%)", data: data.map(({ timestamp, ceOI, peOI }) => ({ x: timestamp, y: ceOI-peOI })) }
    //       // ,{ id: 'PEOI', data: data.map(({ timestamp, peOI }) => ({ x: timestamp, y: peOI })) }
    //     ]}