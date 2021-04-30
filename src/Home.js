import React, { Component, useState } from 'react';

class Home extends Component {

    state = {
        books: []
    }

    componentDidMount() {
        fetch('http://127.0.0.1:3000/api/getTodoList')
            .then((response) => response.json())
            .then(booksList => {
                this.setState({ books: booksList.data });
            });
    }


    deleteItem(id) {
        fetch('http://127.0.0.1:3000/api/delete', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            },
            body: {
                "id": id,
                "CSRFToken": "OWY4NmQwODE4ODRjN2Q2NTlhMmZlYWEwYzU1YWQwMTVhM2JmNGYxYjJiMGI4MjJjZDE1ZDZMGYwMGEwOA=="
            }
        }).then((result) => {

            result.json().then((responce) => {
                console.log(responce);

                if (responce.success) {
                    alert(responce.message);
                    window.location.href = "/";

                }
            });
        });
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
                                    <td>{product.status} <span> <i class="fa fa-pencil" onClick={() => { alert('clicked') }}></i></span></td>

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