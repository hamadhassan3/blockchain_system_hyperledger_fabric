import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Nav2 extends Component {
    render() {
        return (
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
                                <Link className="nav-link" to={"/outputReporting"}>Reporting Data</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={"/"}>Logout</Link>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav2;
