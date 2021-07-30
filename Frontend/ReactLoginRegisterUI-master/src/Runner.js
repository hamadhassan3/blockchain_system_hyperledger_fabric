import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login1 from "./components/login.components123";
import Login from "./components/login.components";
import SignUp from "./components/signup-components";
import Output from "./components/output";
import OutputReporting from "./components/outputReporting";
import ReportingData from "./components/reportingdata";
import CalculateRoyalty from './components/CalculateRoyalty';


const Runner = ()=>{
    return (<Router>


      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>Royalty App</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Oil Measurements</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-up"}>Gas Measurements</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/output"}>Output</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/CalculateRoyalty"}>CalculateRoyalty</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to={"/outputReporting"}>OutputR</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/reportingdata"}>ReportingData</Link>
                </li>
  
              </ul>
            </div>
          </div>
        </nav>

        <div className="outer">
          <div className="inner">
            <Switch>
              <Route exact path='/Runner' component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/output" component={Output} />
              <Route path="/outputReporting" component={OutputReporting} />
              <Route path="/reportingdata" component={ReportingData} />
              <Route path="/CalculateRoyalty" component={CalculateRoyalty} />
            </Switch>
          </div>
        </div>
      </div></Router>
    );
    


}

export default Runner;
