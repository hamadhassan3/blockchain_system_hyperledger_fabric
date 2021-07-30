import React, {Component} from "react";
import axios from 'axios'
import Nav2 from "./Nav2";

export default class output extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total_disposition: '',
            closing_inventory: '',
            opening_inventory: '',
            total_receipts: '',
            temperature: '',
            viscosity: '',
            well_id: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleFormSubmit(e) {


        e.preventDefault();

        console.log("FORM SUBMIT!");

        const bodyParameters1 = {
            /*
              "username": "cold",
              "orgName": "Org1",
              "password": "password"
            */
            "total_disposition": "123",
            "closing_inventory": " ",
            "opening_inventory": " ",
            "total_receipts": " ",
            "temperature": " ",
            "viscosity": " ",
            "well_id": " ",


        };

        axios.get("http://localhost:4002/users/login", bodyParameters1)
            .then(response => {


                token = response.data.message.token


            });


        const bodyParameters = {
            "channelName": "mychannel",
            "chaincodeName": "measurement",
            "function": "addNewMeasurement",
            "args": [
                parseFloat(this.state.well_id),
                parseFloat(this.state.total_disposition),
                parseFloat(this.state.closing_inventory),
                parseFloat(this.state.opening_inventory),
                parseFloat(this.state.total_receipts),
                parseFloat(this.state.temperature),
                parseFloat(this.state.viscosity)

            ]
        }


        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjA0MDM1MzksInVzZXJuYW1lIjoiY29sZCIsIm9yZ05hbWUiOiJPcmcxIiwicGFzc3dvcmQiOiJwYXNzd29yZCIsImlhdCI6MTYyMDM2NzUzOX0.yfPQAHsxIrEBH-n6Dx8mKmL0TV8qjKL6vcSn08-WH6E";

        /*        const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }
                axios.post("http://localhost:4002/channels/mychannel/chaincodes/measurement",
                bodyParameters,
                config)
                .then();

          */


    }


    // Form submitting logic, prevent default page refresh
    handleSubmit(event) {
        const {
            total_disposition,
            closing_inventory,
            opening_inventory,
            total_receipts,
            temperature,
            viscosity,
            well_id
        } = this.state
        event.preventDefault()


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

                <form>

                    <h1>...</h1>
                    <h1>Measurements Added</h1>
                    <br/>
                    <div className="form-group">
                        <label>Total Dispostion</label>
                        <label style={{marginLeft: "30px"}}>123</label>
                    </div>

                    <div className="form-group">
                        <label>Closing Inventory</label>
                        <label style={{marginLeft: "30px"}}>123</label>
                    </div>

                    <div className="form-group">
                        <label>Opening Inventory</label>
                        <label style={{marginLeft: "30px"}}>123</label>
                    </div>

                    <div className="form-group">
                        <label>Total Receipts</label>
                        <label style={{marginLeft: "30px"}}>123</label>
                    </div>

                    <div className="form-group">
                        <label>Temperature</label>
                        <label style={{marginLeft: "30px"}}>123</label>
                    </div>


                    <div className="form-group">
                        <label>Viscosity</label>
                        <label style={{marginLeft: "30px"}}>123</label>
                    </div>
                    <div className="form-group">
                        <label>Well ID</label>
                        <label style={{marginLeft: "30px"}}>123</label>
                    </div>

                </form>
            </>
        );
    }
}
