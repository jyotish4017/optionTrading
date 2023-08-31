import React, { useEffect, useState } from 'react';

const ApiList = {
    GLOSSARY : '/api/cmsContent?url=/glossary',
    HOLIDAY_TRADING : '/api/holiday-master?type=trading',
    HOLIDAY_CLEARING : '/api/holiday-master?type=clearing',
    MARKET_STATUS : '/api/marketStatus',
    MARKET_TURNOVER : '/api/market-turnover',
    ALL_INDICES : '/api/allIndices',
    INDEX_NAMES : '/api/index-names',
    CIRCULARS : '/api/circulars',
    LATEST_CIRCULARS : '/api/latest-circular',
    EQUITY_MASTER : '/api/equity-master',
    MARKET_DATA_PRE_OPEN : '/api/market-data-pre-open?key=ALL',
    MERGED_DAILY_REPORTS_CAPITAL : '/api/merged-daily-reports?key=favCapital',
    MERGED_DAILY_REPORTS_DERIVATIVES : '/api/merged-daily-reports?key=favDerivatives',
    MERGED_DAILY_REPORTS_DEBT : '/api/merged-daily-reports?key=favDebt'
}

function Testing3() {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://www.nseindia.com${ApiList.HOLIDAY_CLEARING}`);
          const jsonData = await response.json();
          setData(jsonData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      const interval = setInterval(() => {
        console.log("Calculating!");
        fetchData();
      },6000);
      return () => {
        clearInterval(interval);
      }
    }, []);

    console.log(data);
    
  return (
    <div>T</div>
  )
}

export default Testing3;