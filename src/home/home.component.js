import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../home/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col className="pad_top_30">
            <h1>
              Stock Prices
              <span className="chart-style">
                <FontAwesomeIcon icon={faChartLine} />
              </span>
            </h1>
            <p>
              Welcome to the Stock Market Page. You may click on stocks to view
              all the stocks or search to view the latest 100 days of activity.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
