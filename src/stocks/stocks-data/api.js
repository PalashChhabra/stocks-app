import externalurls from "../../environment/environment.js";
import { useState, useEffect } from "react";

function getStocksData(param) {
  // if no params, get all data
  let url = externalurls.allstocksDataAPI;
  if (param) {
    url = `${externalurls.filteredIndustryData}?industry=${param}`;
    //get data based on selected industry
  }

  return fetch(url)
    .then((res) => res.json())
    .then((res) =>
      res.map((data) => ({
        symbol: data.symbol,
        name: data.name,
        industry: data.industry,
      }))
    );
}

export function useStocksData(param) {
  //custom hook to set data
  const [loading, setLoading] = useState(true);
  const [stockData, setStockData] = useState([]);
  const [industryData, setIndustryData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    //useEffect hook to fetch all industry type for dropdown display
    getStocksData(param)
      .then((data) => {
        setStockData(data);
        if (!param) {
          setIndustryData(
            data.map((items) => ({
              industry: items.industry,
            }))
          );
        }
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [param]);

  return {
    loading,
    stockData,
    industryData,
    error,
  };
}
