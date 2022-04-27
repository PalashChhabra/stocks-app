import externalurls from "../../environment/environment.js";
import { useState, useEffect } from "react";
import { DateFormatter, RFtoDateFormatter } from "../helper-components/date.js";

function formatNumber(num) {
  //comma seprated values
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function getStocksDetails(param) {
  //url fetched from environment file
  let url = `${externalurls.getstockHistory}?symbol=${param}`;

  return fetch(url)
    .then((res) => res.json())
    .then((res) =>
      res.map((data) => ({
        timestamp: data.timestamp,
        formattedDate: DateFormatter(RFtoDateFormatter(data.timestamp)),
        open: Number(data.open).toFixed(2),
        high: Number(data.high).toFixed(2),
        low: Number(data.low).toFixed(2),
        close: Number(data.close).toFixed(2),
        volumes: formatNumber(data.volumes),
      }))
    );
}

export function useStocksDetails(param) {
  const [loading, setLoading] = useState(true);
  const [stockDetails, setStockDetails] = useState([]);
  const [oldStockDetails, setOldStockDetails] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getStocksDetails(param)
      .then((data) => {
        setStockDetails(data);
        setOldStockDetails(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [param]);

  return {
    loading,
    stockDetails,
    oldStockDetails,
    error,
  };
}
