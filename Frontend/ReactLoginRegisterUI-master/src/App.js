import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Login from "./components/login.components123";
import OilMeasurement from "./components/OilMeasurement";
import GasMeasurement from "./components/signup-components";
import OutputReporting from "./components/outputReporting";
import EditScreen from './components/EditScreen'

window.$token = ""
window.$id = ""
const App = () => {

    window.$token = ""
    
    return (
        <div className="outer">
            <div className="inner">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login}/>
                        <Route exact path='/login' component={Login}/>
                        <Route path="/sign-in" component={OilMeasurement}/>
                        <Route exact path='/Runner' component={OilMeasurement}/>
                        <Route path="/sign-up" component={GasMeasurement}/>
                        <Route path="/outputReporting" component={OutputReporting}/>
                        <Route path="/EditScreen" component={EditScreen}/>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
