import React, { useState } from "react";
import StocksData from "./stocks-data.component";
import SearchBar from "./searchBar/searchbar.component.js";
import { Container, Row, Col } from "reactstrap";
import { useStocksData } from "./api.js";
import { DateFormatter } from "../helper-components/date.js";

function Stocks() {
  // contain all the states for stocks page
  //master component that has sub components
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [isFilteredDisplay, setIsFilteredDisplay] = useState(false);
  const [filteredStockData, setfilteredStockData] = useState();
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const { loading, stockData, industryData, error } = useStocksData(
    selectedIndustry
  );

  let today = new Date();

  const handleChange = (opt) => {
    //change selected stock code
    if (opt.value) {
      setSelectedSymbol(opt.value);
    } else {
      setSelectedSymbol("");
    }
  };

  const filterResults = () => {
    //filter by stock code
    let oldStockData = stockData.map((item) => {
      return { symbol: item.symbol, name: item.name, industry: item.industry };
    });

    if (selectedSymbol !== "") {
      let newStockData = [];
      newStockData = oldStockData.filter((item) =>
        item.symbol.includes(selectedSymbol)
      );
      setIsFilteredDisplay(true);
      setfilteredStockData(newStockData);
    } else {
      setIsFilteredDisplay(false);
      setfilteredStockData(oldStockData);
    }
  };

  const filterIndustry = (opt) => {
    //filter by industry
    setSelectedSymbol("");
    setIsFilteredDisplay(false);
    if (opt.value) {
      setSelectedIndustry(opt.value);
    } else {
      setSelectedIndustry("");
    }
  };

  const clearIndustry = () => {
    //clear button logic, reset all states
    setSelectedSymbol("");
    setIsFilteredDisplay(false);
    setSelectedIndustry("");
  };
  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="pad_top_30">
            <SearchBar
              {...{ loading, stockData, error }}
              filterResults={filterResults}
              handleChange={(opt) => handleChange(opt)}
              filterIndustry={filterIndustry}
              selectedIndustry={selectedIndustry}
              selectedSymbol={selectedSymbol}
              industryData={industryData}
              clearIndustry={clearIndustry}
            />
            {selectedIndustry ? (
              <h6>Showing stocks for {DateFormatter(today)}</h6>
            ) : null}
            {isFilteredDisplay ? (
              <StocksData
                loading={loading}
                stockData={filteredStockData}
                error={error}
              />
            ) : (
              <StocksData {...{ loading, stockData, error }} />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Stocks;
