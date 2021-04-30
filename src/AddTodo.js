import React, { Component } from 'react';
import {
    Redirect
} from "react-router-dom";

class AddTodo extends Component {




    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {}
        }
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if (typeof fields["priority"] !== "undefined") {
            if (!fields["priority"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["priority"] = "Only letters";
            }
        }

        //Email
        if (!fields["dueDate"]) {
            formIsValid = false;
            errors["dueDate"] = "Cannot be empty";
        }

        if (!fields["status"]) {
            formIsValid = false;
            errors["status"] = "Cannot be empty";
        }



        this.setState({ errors: errors });
        return formIsValid;
    }

    contactSubmit(e) {
        e.preventDefault();

        if (this.handleValidation()) {
            console.log(this.state.fields);
            fetch('http://127.0.0.1:3000/api/add', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.fields)
            }).then((result) => {

                result.json().then((responce) => {
                    console.log(responce);

                    if (responce.status) {
                        alert(responce.message);
                        window.location.href = "/";

                    }
                });
            });


        } else {
            alert("Form has errors.")
        }

    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }


    render() {
        return (
            <div className="container p-5">

                <div className="row justify-content-center myrow">

                    <div className="col-md-4 myfclass">
                        <form name="contactform" onSubmit={this.contactSubmit.bind(this)}>
                            <fieldset>
                                <div className="row">
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
                                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" ref="name" onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} />
                                        <span style={{ color: "red" }}> {this.state.errors["name"]}</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">Priority</span>
                                        <select className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" ref="priority" onChange={this.handleChange.bind(this, "priority")} value={this.state.fields["priority"]} >
                                            <option value="">Select Option</option>
                                            <option value="low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                        <span style={{ color: "red" }}> {this.state.errors["priority"]}</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text" id="inputGroup-sizing-sm">Due Date</span>
                                        <input type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" ref="dueDate" onChange={this.handleChange.bind(this, "dueDate")} value={this.state.fields["dueDate"]} />
                                        <span style={{ color: "red" }}> {this.state.errors["dueDate"]}</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-group input-group-sm mb-3">
                                        <span className="input-group-text">Status</span>
                                        <select


                                            className="form-control" ref="status" onChange={this.handleChange.bind(this, "status")} value={this.state.fields["status"]} >
                                            <option value="">Select Option</option>
                                            <option value="Review">Review</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                        <span style={{ color: "red" }}> {this.state.errors["status"]}</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <button className="btn btn-success" type="submit">Add</button>
                                </div>
                            </fieldset>
                        </form>
                    </div>


                </div>



            </div>
        )
    }
}


export default AddTodo;