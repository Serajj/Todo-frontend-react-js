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

    updateValue(id, data) {

        fetch("https://serajtodo.herokuapp.com/api/updateData", {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "id": id, "data": data })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    alert("Updated Successfully !!");
                    window.location.href = "/";
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert('failed to update');
                    console.log(error);
                }
            )

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
                                    <td>{product.status} <span> <i class="fa fa-pencil" onClick={() => { this.updateValue(product._id, product.status) }}></i></span>



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