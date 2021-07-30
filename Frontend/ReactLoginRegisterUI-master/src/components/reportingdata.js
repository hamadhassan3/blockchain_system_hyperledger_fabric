import React, {Component} from "react";
import axios from 'axios'
import Nav2 from "./Nav2";

export default class ReportingData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Date_and_Month: '',
            Test_Production: '',
            Test_Duration: '',
            Test_rate_per_hour: '',
            Hours_of_production: '',
            Estimated_Production: '',
            Production: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleFormSubmit(e) {


        e.preventDefault();

        console.log("FORM SUBMIT!");

        /*const bodyParameters1 = {

            "username": "cold",
            "orgName": "Org1",
            "password": "password"

          };

        axios.get("http://localhost:4002/users/login", bodyParameters1)
          .then(response => {


            token = response.data.message.token


        });*/


        const bodyParameters = {
            "channelName": "mychannel",
            "chaincodeName": "measurement",
            "function": "addNewMeasurement",
            "args": [
                parseFloat(this.state.Production),
                parseFloat(this.state.Date_and_Month),
                parseFloat(this.state.Test_Production),
                parseFloat(this.state.Test_Duration),
                parseFloat(this.state.Test_rate_per_hour),
                parseFloat(this.state.Hours_of_production),
                parseFloat(this.state.Estimated_Production)

            ]
        }


        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjA0MDM1MzksInVzZXJuYW1lIjoiY29sZCIsIm9yZ05hbWUiOiJPcmcxIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTYyMDM2NzUzOX0.yfPQAHsxIrEBH-n6Dx8mKmL0TV8qjKL6vcSn08-WH6E";

        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        axios.post("http://localhost:4002/channels/mychannel/chaincodes/measurement",
            bodyParameters,
            config)
            .then();


    }


    // Form submitting logic, prevent default page refresh
    handleSubmit(event) {
        const {
            Date_and_Month,
            Test_Production,
            Test_Duration,
            Test_rate_per_hour,
            Hours_of_production,
            Estimated_Production,
            Production
        } = this.state
        event.preventDefault()


        alert(`
        Meaurements added are:
        Date_and_Month : ${Date_and_Month}
        Test_Production : ${Test_Production}
        Test_Duration : ${Test_Duration}
        Test_rate_per_hour : ${Test_rate_per_hour}
        Hours_of_production : ${Hours_of_production}
        Estimated_Production : ${Estimated_Production}
        Production : ${Production}
        `)


        this.handleFormSubmit(event);
    }

    // Method causes to store all the values of the
    // input field in react state single method handle
    // input changes of all the input field using ES6
    // javascript feature computed property names
    handleChange(event) {
        this.setState({
            // Computed property names
            // keys of the objects are computed dynamically
            [event.target.name]: event.target.value
        })
    }


    render() {
        return (
            <>
                <Nav2/>
                <form style={{marginTop: "200px"}} onSubmit={this.handleSubmit}>

                    <h1>...</h1>
                    <h1>ReportingData</h1>

                    <div className="form-group">
                        <label>Date_and_Month</label>
                        <input name='Date_and_Month'
                               placeholder='Date_and_Month'
                               value={this.state.Date_and_Month}
                               onChange={this.handleChange} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Test_Production</label>
                        <input name='Test_Production'
                               placeholder='Test_Production'
                               value={this.state.Test_Production}
                               onChange={this.handleChange} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Test_Duration</label>
                        <input name='Test_Duration'
                               placeholder='Test_Duration'
                               value={this.state.Test_Duration}
                               onChange={this.handleChange} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Test_rate_per_hour</label>
                        <input name='Test_rate_per_hour'
                               placeholder='Test_rate_per_hour'
                               value={this.state.Test_rate_per_hour}
                               onChange={this.handleChange} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Hours_of_production</label>
                        <input name='Hours_of_production'
                               placeholder='Hours_of_production'
                               value={this.state.Hours_of_production}
                               onChange={this.handleChange} className="form-control"/>
                    </div>


                    <div className="form-group">
                        <label>Estimated_Production</label>
                        <input name='Estimated_Production'
                               placeholder='Estimated_Production'
                               value={this.state.Estimated_Production}
                               onChange={this.handleChange} className="form-control"/>
                    </div>


                    <div className="form-group">
                        <label>Production</label>
                        <input name='Production'
                               placeholder='Production'
                               value={this.state.Production}
                               onChange={this.handleChange} className="form-control"/>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>

                </form>
            </>
        );
    }
}
