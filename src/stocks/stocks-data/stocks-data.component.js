import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const StocksData = (props) => {
  const { loading, stockData, error } = props;
  const columns = [
    {
      headerName: "Symbol",
      field: "symbol",
      sortable: true,
      filter: true,
      cellClass: "fontsize14",
      //logic to pass stock code and name on click, Link element of router-dom is used to pass data
      cellRendererFramework: (params) => {
        return (
          <Link
            to={{
              pathname: "/stockdetails",
              state: {
                symbol: params.data.symbol,
                name: params.data.name,
              },
            }}
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      headerName: "Name",
      field: "name",
      sortable: true,
      filter: true,
      cellClass: "fontsize14",
      cellRendererFramework: (params) => {
        return (
          <Link
            to={{
              pathname: "/stockdetails",
              state: {
                symbol: params.data.symbol,
                name: params.data.name,
              },
            }}
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      headerName: "Industry",
      field: "industry",
      sortable: true,
      filter: true,
      cellClass: "fontsize14",
    },
  ];

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong : {error.message}</p>;
  } else {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col className="no_pad">
              <div
                className="ag-theme-balham"
                style={{ height: "100%", width: "100%" }}
              >
                <AgGridReact
                  columnDefs={columns}
                  rowData={stockData}
                  pagination={true}
                  domLayout="autoHeight"
                  onGridReady={(params) => {
                    params.api.sizeColumnsToFit();
                    params.api.resetRowHeights();
                  }}
                  paginationPageSize={30}
                  reactNext={true}
                ></AgGridReact>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
};

export default StocksData;
