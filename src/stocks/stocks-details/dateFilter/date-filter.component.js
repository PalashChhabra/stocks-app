import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col } from "reactstrap";

const DateFilter = (props) => {
  //date picker
  return (
    <div>
      <Container fluid>
        <Row className="pad_top_20">
          <Col className="pad_left_0" xs="6" md="4" lg="4" xl="4">
            <div>
              <h6>Showing Results After </h6>
            </div>
          </Col>
        </Row>
        <Row className="pad_bottom_15">
          <Col className="pad_left_0" xs="4" md="3" lg="3" xl="3">
            <DatePicker
              selected={
                props.selectedDate ? props.selectedDate : props.initialDate
              }
              onChange={(date) => props.changeDate(date)}
              maxDate={new Date()}
              placeholderText="Click to Select Date"
              dateFormat="dd/MM/yyyy"
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DateFilter;
