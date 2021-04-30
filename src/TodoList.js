import React, { useState, useEffect } from "react";

import Axios from "axios";

function TodoList() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const { data } = await Axios.get(
            "http://127.0.0.1:3000/api/getTodoList"
        );
        const products = data.data;
        setProducts(products);
        console.log(products);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

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

                        {products.map((product) => (
                            <tr>
                                <th scope="row">#</th>
                                <td>{product.name}</td>
                                <td>{product.priority}</td>
                                <td>{product.dueDate.split("T")[0]}</td>
                                <td>{product.status} <span> <i class="fa fa-pencil" onClick={() => { alert('clicked') }}></i></span></td>

                                <td> <span> <i class="fa fa-remove" onClick={() => { }}></i></span></td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default TodoList;