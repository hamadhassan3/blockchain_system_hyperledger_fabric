import React, {Component} from "react";
import axios from 'axios'
import Nav2 from "./Nav2";
import Nav4 from './Nav3'
import {Redirect} from "react-router-dom";
export default class EditScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total_disposition: '',
            closing_inventory: '',
            opening_inventory: '',
            total_receipts: '',
            temperature: '',
            viscosity: '',
            well_id: '',
            history: '',
            approved: '',
            oilorgas: '',
            reason: '',
            render: false,
            render2: false,
            redirect: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmit2 = this.handleSubmit2.bind(this)
    }


    handleFormApprove(e) {


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


        });



    */

        const bodyParameters = {
            "channelName": "mychannel",
            "chaincodeName": "measurement",
            "function": "approveMeasurement",
            "args": [
                parseFloat(this.state.well_id),
                

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
    
                    this.setState({redirect: "/Runner"});
                } 


            );


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


        });



    */

        const bodyParameters = {
            "channelName": "mychannel",
            "chaincodeName": "measurement",
            "function": "updateData",
            "args": [
                parseFloat(this.state.well_id),
                parseFloat(this.state.total_disposition),
                parseFloat(this.state.closing_inventory),
                parseFloat(this.state.opening_inventory),
                parseFloat(this.state.total_receipts),
                parseFloat(this.state.temperature),
                parseFloat(this.state.viscosity),
                this.state.reason
                

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
    
                    this.setState({redirect: "/Runner"});
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
            well_id,
            history
        } = this.state
        event.preventDefault()


        this.handleFormSubmit(event);
    }

    // Form submitting logic, prevent default page refresh
    handleSubmit2(event) {
        const {
            total_disposition,
            closing_inventory,
            opening_inventory,
            total_receipts,
            temperature,
            viscosity,
            well_id,
            history
        } = this.state
        event.preventDefault()


        this.handleFormApprove(event);
    }

    //this.setState({redirect: "/Runner"});

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

            if(this.state.render == false){
                var token = window.$token;

                console.log("Inside output: " + token)

                const config = {
                    headers: {Authorization: `Bearer ${token}`}
                }


                const bodyParameters = {
                    "channelName": "mychannel",
                    "chaincodeName": "measurement",
                    "function": "queryMeasurementByID",
                    "args": [
                        window.$id
                    ]
                }


                axios.post("http://localhost:4002/channels/mychannel/chaincodes/measurement", bodyParameters,
                    config)
                    .then(

                        response => {

                            let it=response.data.result;

                            console.log("HERE: ")
                            console.log(it)
                            this.setState({
                                total_disposition: it.result.totalDisposition,
                                closing_inventory: it.result.closingInventory,
                                opening_inventory: it.result.openingInventory,
                                total_receipts: it.result.receipts,
                                temperature: it.result.temperature,
                                viscosity: it.result.viscosity,
                                well_id: it.result.wellID,
                                approved: it.result.approved,
                                oilorgas: it.result.oilorgas,
                                reason: it.result.reason,
                                history: '',
                                render: true,
                                render2: false,
                                redirect: null,
                                
                            });




                        }
                );

                return <div>Loading...</div>
            }
            else{


                if(this.state.render2 == false){
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    var token = window.$token;

                    console.log("Inside output: " + token)
    
                    const config = {
                        headers: {Authorization: `Bearer ${token}`}
                    }
    
    
                    const bodyParameters = {
                        "channelName": "mychannel",
                        "chaincodeName": "measurement",
                        "function": "getHistoryForAsset",
                        "args": [
                            window.$id
                        ]
                    }

                    axios.post("http://localhost:4002/channels/mychannel/chaincodes/measurement", bodyParameters,
                    config)
                    .then(
                        response => {


                            this.setState({
                                total_disposition: this.state.total_disposition,
                                closing_inventory: this.state.closing_inventory,
                                opening_inventory: this.state.opening_inventory,
                                total_receipts: this.state.total_receipts,
                                temperature: this.state.temperature,
                                viscosity: this.state.viscosity,
                                well_id: this.state.well_id,
                                approved: this.state.approved,
                                oilorgas: this.state.oilorgas,
                                reason: this.state.reason,
                                history: JSON.stringify(response.data.result),
                                render: true,
                                render2: true,
                                redirect: null,
                                
                            });

                        }
                    );

                    return <div>Loading...</div>;
                }

                else{
                    console.log(this.state)
                    return (
                        <>
                            <Nav4/>
                            <form style={{marginTop: "200px"}} onSubmit={this.handleSubmit}>

                                <h1>...</h1>
                                <h1>Edit Measurement</h1>

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
                                    <label>Reason for changing</label>
                                    <input name='reason'
                                        placeholder='Reason'
                                        value={this.state.reason}
                                        onChange={this.handleChange}
                                        className="form-control"/>
                                </div>


                                <div className="form-group">
                                    <label>Well ID</label>
                                    <input readonly placeholder="Well ID" name='well_id'
                                        
                                        className="form-control"
                                        value={this.state.well_id}
                                        type="text"
                                        >

                                        </input>
                                        
                                </div>

                                <div className="form-group">
                                    <label>Approved</label>
                                    <input readonly placeholder="Approved" name='approved'
                                        
                                        className="form-control"
                                        value={this.state.approved}
                                        type="text"
                                        >

                                        </input>
                                        
                                </div>


                                <div>
                                    <label>History</label>
                                    <textarea readonly name='history' placeholder='History' value={this.state.history}
                                            onChage={this.handleChange} className="form-control"/>
                                </div>

                                <br></br>


                                <button type="Submit" onClick={this.handleSubmit2} className="btn btn-dark btn-lg btn-block">Approve</button>
                                <button type="Submit" onClick={this.handleSubmit} className="btn btn-dark btn-lg btn-block">Update Data</button>

                            </form>
                        </>
                    );

                }
            }
        }
    }
}
