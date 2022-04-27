import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useStocksDetails } from "./api.js";
import { RFtoDateFormatter } from "../helper-components/date.js";
import DateFilter from "./dateFilter/date-filter.component.js";
import LineChart from "../helper-components/chart.js";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const StockDetails = (props) => {
  //column defs
  const columns = [
    {
      headerName: "Date",
      field: "formattedDate",
      cellClass: "fontsize14",
    },
    {
      headerName: "Open",
      field: "open",
      sortable: true,
      filter: "agNumberColumnFilter",
      cellClass: "fontsize14",
    },
    {
      headerName: "High",
      field: "high",
      sortable: true,
      filter: "agNumberColumnFilter",
      cellClass: "fontsize14",
    },
    {
      headerName: "Low",
      field: "low",
      sortable: true,
      filter: "agNumberColumnFilter",
      cellClass: "fontsize14",
    },
    {
      headerName: "Close",
      field: "close",
      sortable: true,
      filter: "agNumberColumnFilter",
      cellClass: "fontsize14",
    },
    {
      headerName: "Volumes",
      field: "volumes",
      sortable: true,
      filter: "agNumberColumnFilter",
      cellClass: "fontsize14",
    },
  ];

  const { symbol } = props.location.state;
  const { name } = props.location.state;

  const { loading, stockDetails, error } = useStocksDetails(symbol);
  const [stockDetailsData, setStockDetailsData] = useState();
  const [isFilteredDisplay, setIsFilteredDisplay] = useState(false);

  let initialDate;
  if (stockDetails.length) {
    //get initial date to show stocks from; this is as default value for date picker
    initialDate = RFtoDateFormatter(
      stockDetails[stockDetails.length - 1].timestamp
    );
  }

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const changeDate = (date) => {
    //on date change; change state
    setSelectedDate(date);
    setIsFilteredDisplay(true);
  };

  function filterResults() {
    //filter results based on date logic
    let newStockDetails = [];
    let oldStockDetails = stockDetails.map((item) => {
      return {
        timestamp: item.timestamp,
        formattedDate: item.formattedDate,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        volumes: item.volumes,
      };
    });

    oldStockDetails.map((item) => {
      //convert to normal date
      let convertedValue = RFtoDateFormatter(item.timestamp).getTime();
      //change selected date time to 2:00:00 to match fetched timestamp
      let valueCont = new Date(selectedDate.setHours(14, 0, 0, 0)).getTime();
      if (convertedValue >= valueCont) {
        //compare dates based on total seconds time
        newStockDetails.push({
          timestamp: item.timestamp,
          formattedDate: item.formattedDate,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volumes: item.volumes,
        });
      }
      return newStockDetails;
    });
    setStockDetailsData(newStockDetails);
  }

  useEffect(() => {
    filterResults(); //call function everytime there is a date change
  }, [selectedDate]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong : {error.message}</p>;
  } else {
    return (
      <div>
        <Container fluid>
          <DateFilter
            selectedDate={selectedDate}
            changeDate={changeDate}
            initialDate={initialDate}
          />
          <Row>
            <Col className="">
              <div
                className="ag-theme-balham"
                style={{ height: "100%", width: "100%" }}
              >
                {name ? <h6>Showing stocks for {name} </h6> : null}
                {isFilteredDisplay ? (
                  stockDetailsData.length ? (
                    <AgGridReact
                      columnDefs={columns}
                      rowData={stockDetailsData}
                      pagination={true}
                      domLayout="autoHeight"
                      onGridReady={(params) => {
                        params.api.sizeColumnsToFit();
                        params.api.resetRowHeights();
                      }}
                      paginationPageSize={20}
                      reactNext={true}
                    ></AgGridReact>
                  ) : (
                    <div>
                      No Results Exist after the date you have selected. Please
                      select a lower date to filter results after that date.
                    </div>
                  )
                ) : (
                  <AgGridReact
                    columnDefs={columns}
                    rowData={stockDetails}
                    pagination={true}
                    domLayout="autoHeight"
                    onGridReady={(params) => {
                      params.api.sizeColumnsToFit();
                      params.api.resetRowHeights();
                    }}
                    paginationPageSize={20}
                    reactNext={true}
                  ></AgGridReact>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <LineChart
                chartData={isFilteredDisplay ? stockDetailsData : stockDetails}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default StockDetails;
