import React, {Component} from "react";
import axios from 'axios'
import Nav2 from "./Nav2";

import {Redirect} from "react-router-dom";
export default class outputReporting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false, //Set render state to false
            redirect:null,
            items:[]
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }




    // Form submitting logic, prevent default page refresh
    handleSubmit(event) {

        event.preventDefault()


        this.buttonsbutt(event);
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

    
    

    buttonsbutt(event){
         

        

        window.$id = this.state.items.result[event.target.value].Record.wellID

        alert(window.$id)

        this.setState({redirect: "/EditScreen"});

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
                    "function": "queryAllMeasurements",
                    "args": [
                    ]
                }


                axios.post("http://localhost:4002/channels/mychannel/chaincodes/measurement", bodyParameters,
                    config)
                    .then(

                        response => {

                            let it=response.data.result;

                            this.setState({render: true, redirect:null, items: it});
                            
                        }
                );

                return <div>Loading...</div>
            }
            else{
    



            


                let itemList=[];


                let items = []
                for(let i = 0; i < this.state.items.result.length; i++){
                    //console.log(this.state.items.result[i])
                    items.push("well id: " + this.state.items.result[i].Record.wellID + " latest update by: " + this.state.items.result[i].Record.username)
                }
                var counter = 0;
                items.forEach((item,index)=>{
                    itemList.push( <li key={index}> <button onClick={this.handleSubmit}  value = {counter}  >  {item} </button>  </li>  )
                    counter += 1
                })



            
                return (
                    <>
                    <Nav2/>
                    <div className="patient-container">
                    <ul>
                    {itemList}
                        
                    </ul>
                    </div>
                    </>
                );
            }
        }
    }
}
