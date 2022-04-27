import React from "react";
import Select from "react-select";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { Container, Row, Col, Button } from "reactstrap";
import "./searchbar.css";

const SearchBar = (props) => {
  const stockData = props.stockData;
  const industryData = props.industryData;

  const allSymbols = stockData.map((item) => ({
    label: item.symbol,
    value: item.symbol,
  }));

  const allIndustry = industryData
    .map((item) => item.industry)
    .filter((value, index, self) => self.indexOf(value) === index);

  let setVal = {
    //initial value of select dropdown
    label: "Select Stock..",
    value: "",
  };

  if (props.selectedSymbol) {
    //for select dropdown
    setVal = {
      label: props.selectedSymbol,
      value: props.selectedSymbol,
    };
  }

  return (
    <div>
      <Container fluid>
        <Row className="pad_bottom_15">
          <Col className="pad_left_0" xs="6" md="3" lg="3" xl="2">
            <Select
              options={allSymbols}
              onChange={props.handleChange}
              placeholder="Select Stock.."
              value={setVal}
            />
          </Col>
          <Col xs="6" md="3" lg="2" xl="2">
            <Button color="primary" onClick={props.filterResults}>
              Search
            </Button>
          </Col>
          <Col
            xs="6"
            md="4"
            lg={{ size: 3, offset: 2 }}
            xl={{ size: 2, offset: 4 }}
          >
            <Dropdown
              isClearable
              options={allIndustry}
              onChange={props.filterIndustry}
              value={props.selectedIndustry}
              placeholder="Choose Industry.."
              placeholderClassName="greyText"
              controlClassName="blackText"
              id="selectedIndustry"
            />
          </Col>
          <Col xs="6" md="2" lg="2" xl="2">
            <Button
              size="sm"
              className="pad_btn_left"
              color="secondary"
              onClick={props.clearIndustry}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SearchBar;
