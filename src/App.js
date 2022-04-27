import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./home/home.component.js";
import Stocks from "./stocks/stocks-data/stocks.component";
import StockDetails from "./stocks/stocks-details/stocks-details.components.js";
import NotFoundPage from "./errorPage/error-page.component.js";
function App() {
  //Entry Point of the app
  return (
    <div>
      <div className="header">
        <CustomLink exact={true} to="/">
          Home
        </CustomLink>
        <CustomLink to="/stocks">Stocks</CustomLink>
      </div>

      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/stocks" component={Stocks} />
        <Route path="/stockdetails" component={StockDetails} />
        <Route path="/404" component={StockDetails} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

const CustomLink = ({ children, to, exact }) => (
  <Route
    path={to}
    exact={exact}
    children={({ match }) => (
      <div className={match ? "active" : ""}>
        <Link to={to}>{children}</Link>
      </div>
    )}
  />
);
export default App;
