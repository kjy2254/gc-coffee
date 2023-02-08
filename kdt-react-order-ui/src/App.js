import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React, {useEffect, useState} from 'react';
import {ProductList} from "./components/ProductList";
import {Summary} from "./components/Summary";
import axios from "axios";

function App() {
    const [products, setProducts] = useState([]);
    const [items, setItems] = useState([]);
    const handleAddClicked = id => {
        const product = products.find(v => v.id === id);
        const found = items.find(v => v.id === id);
        const updatedItems = found ?
            items.map(v => (v.id === id) ? {...v, count: v.count + 1} : v)
            : [...items, {...product, count: 1}];
        setItems(updatedItems);
        console.log(items);
    }

    useEffect(() => {
        axios.get('/api/v1/products')
            .then(v => {
                setProducts(v.data);
                console.log(products);
            })
    }, [])

    function handleOrderSubmit(order) {
        if (items.length === 0) {
            alert("아이템을 추가해 주세요!");
        } else {
            axios.post('/api/v1/orders', {
                email: order.email,
                address: order.address,
                postcode: order.postcode,
                orderItems: items.map(v => ({
                    productId: v.productId,
                    category: v.category,
                    price: v.price,
                    quantity: v.quantity
                }))
            }).then(
                v => alert("주문이 정상적으로 접수되었습니다."),
                e => {
                    alert("서버 장애");
                    console.error(e);
                })
        }
    }

    return (<div className="App">
        <div className="container-fluid">
            <div className="row justify-content-center m-4">
                <h1 className="text-center">Grids & Circle</h1>
            </div>
            <div className="card">
                <div className="row">
                    <ProductList products={products} onAddClick={handleAddClicked}/>
                    <Summary items={items} onOrderSubmit={handleOrderSubmit}/>
                </div>
            </div>
        </div>
    </div>);
}

export default App;
