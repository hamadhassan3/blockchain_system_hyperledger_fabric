import axios from 'axios'
import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import Login from "./Nav1";

export default class Login1 extends Component {

    constructor(props) {
        super(props)
        this.state = {Username: '', Password: '', Role: '', redirect: null}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    sign_in(event) {





        this.state.Username = document.getElementById("user_name").value
        this.state.Password = document.getElementById("password").value

        const bodyParameters1 = {

            "username": this.state.Username,
            "orgName": "Org1",
            "password": this.state.Password

        };


        console.log(bodyParameters1)


        axios.post("http://localhost:4002/users/login", bodyParameters1)
            .then(response => {

                if (response.data.success) {


                    window.$token = response.data.message.token

                    console.log(window.$token)

                    this.setState({redirect: "/Runner"});

                } else {
                    alert("Invalid Credentials!")
                }


            });


    }


    // Form submitting logic, prevent default page refresh
    handleSubmit(event) {
        const {Username, Password, Role} = this.state
        event.preventDefault()


        this.sign_in(event);
    }


    handleChange(event) {
        this.setState({
            // Computed property names
            // keys of the objects are computed dynamically
            [event.target.name]: event.target.value
        })
    }


    render() {


        if (this.state.redirect != null) {
            return <Redirect to={this.state.redirect}/>
        } else {

            return (
                <>
                    <Login/>
                    <form>

                        <h3>Log in</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="email" id="user_name" className="form-control" placeholder="Enter username"
                                   onChange={this.handleChange}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" id="password" className="form-control" placeholder="Enter password"
                                   onChange={this.handleChange}/>
                        </div>



                        <button type="submit" onClick={this.handleSubmit} className="btn btn-dark btn-lg btn-block">Sign
                            in
                        </button>

                    </form>
                </>
            );
        }
    }
}
