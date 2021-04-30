import React, { Component, useState } from 'react';

class Home extends Component {

    state = {
        books: [],
        fields: {},
        errors: {}
    }


    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;



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
            fetch('https://serajtodo.herokuapp.com/api/updateData', {
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







    componentDidMount() {
        fetch('https://serajtodo.herokuapp.com/api/getTodoList')
            .then((response) => response.json())
            .then(booksList => {
                this.setState({ books: booksList.data });
            });
    }


    deleteItem(id) {
        fetch("https://serajtodo.herokuapp.com/api/todoListRemove", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "id": id })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    alert("Deleted Successfully !!");
                    window.location.href = "/";
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert('failed to delete');
                    console.log(error);
                }
            )
    }

    render() {
        return (
            <div class="container p-5" >
                <div class="row justify-content-end">
                    <div class="col-md-4">
                        <a href="/addtodo" class="btn btn-primary"> Add TODO</a>
                    </div>
                </div>
                <div class="row p-5">






                    <table class="table mytable">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Task Name</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Due date</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.books.map((product) => (
                                <tr>
                                    <th scope="row">#</th>
                                    <td>{product.name}</td>
                                    <td>{product.priority}</td>
                                    <td>{product.dueDate.split("T")[0]}</td>
                                    <td>{product.status} <span> <button type="button" className="btn btn-primary" data-toggle="modal" data-target={"#" + product._id}><i class="fa fa-pencil"></i></button></span>

                                        <div className="modal fade" id={product._id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Change Status</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <form name="contactform" onSubmit={this.contactSubmit.bind(this)}>
                                                            <fieldset>
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


                                                            </fieldset>
                                                        </form>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        <button className="btn btn-success" type="submit">Update</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </td>

                                    <td> <span> <i class="fa fa-remove" onClick={() => { this.deleteItem(product._id) }}></i></span></td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}


export default Home;