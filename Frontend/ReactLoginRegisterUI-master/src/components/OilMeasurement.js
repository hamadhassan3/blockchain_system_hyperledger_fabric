import React, {Component} from "react";
import axios from 'axios'
import Nav2 from "./Nav2";

export default class OilMeasurement extends Component {
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
                parseFloat(this.state.well_id),
                parseFloat(this.state.total_disposition),
                parseFloat(this.state.closing_inventory),
                parseFloat(this.state.opening_inventory),
                parseFloat(this.state.total_receipts),
                parseFloat(this.state.temperature),
                parseFloat(this.state.viscosity),
                "Oil"

            ]
        }


        console.log("inside form: " + window.$token)
        var token = window.$token
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        axios.post("http://localhost:4002/channels/mychannel/chaincodes/measurement",
            bodyParameters,
            config)
            .then(
                response => {

                    alert(JSON.stringify(response.data))
    
    
                }

            );


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


    handleChange(event) {
        this.setState({
            // Computed property names
            // keys of the objects are computed dynamically
            [event.target.name]: event.target.value
        })
    }


    render() {

        return (
            <div>
                <Nav2/>
                <form style={{marginTop: "200px"}} onSubmit={this.handleSubmit}>

                    <h1>...</h1>
                    <h1>Oil Measurement</h1>

                    <div className="form-group">
                        <label>Total Dispostion</label>
                        <input name='total_disposition'
                               placeholder='Total_disposition'
                               value={this.state.total_disposition}
                               onChange={this.handleChange} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Closing Inventory</label>
                        <input
                            name='closing_inventory'
                            placeholder='Closing_inventory'
                            value={this.state.closing_inventory}
                            onChange={this.handleChange} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Opening Inventory</label>
                        <input name='opening_inventory'
                               placeholder='Opening_inventory'
                               value={this.state.opening_inventory}
                               onChange={this.handleChange} className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Total Receipts</label>
                        <input name='total_receipts'
                               placeholder='Total_receipts'
                               value={this.state.total_receipts}
                               onChange={this.handleChange}
                               className="form-control"/>
                    </div>

                    <div className="form-group">
                        <label>Temperature</label>
                        <input name='temperature'
                               placeholder='Temperature'
                               value={this.state.temperature}
                               onChange={this.handleChange}
                               className="form-control"/>
                    </div>


                    <div className="form-group">
                        <label>Viscosity</label>
                        <input name='viscosity'
                               placeholder='Viscosity'
                               value={this.state.viscosity}
                               onChange={this.handleChange}
                               className="form-control"/>
                    </div>


                    <div className="form-group">
                        <label>Well ID</label>
                        <input name='well_id'
                               placeholder='Well_id'
                               value={this.state.well_id}
                               onChange={this.handleChange}
                               className="form-control"/>
                    </div>

                    <button type="submit" className="btn btn-dark btn-lg btn-block">Submit</button>

                </form>
            </div>
        );
    }
}
