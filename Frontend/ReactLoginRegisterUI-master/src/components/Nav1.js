import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Nav1 extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to={"/login-components123"}>Royalty App</Link>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to={"/login"}>Login</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav1;
