import { getProductsAction, addToCartAction, getCartAction } from '../actions/cartActions';

export const getAllProducts =(dispatch) => {
    fetch("http://localhost:8080/products", {method: "POST", 
    headers: {
        "Content-Type": "application/json"
     },
     mode: "cors"
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("service went wrong...");
            }
            })
        .then(data => dispatch(getProductsAction(transformProducts(data))));
}
    
export const getCart =(dispatch) => {
    fetch("http://localhost:8080/cart", {method: "POST", 
    headers: {
        "Content-Type": "application/json"
     },
     mode: "cors"
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("service went wrong...");
            }
            })
        .then(data => dispatch(getCartAction(transformCart(data))));
}
 
export const addProductToCart =(dispatch, id) => {

    let payload = JSON.stringify({id: id, title:"", desc:"", price:0});
    fetch("http://localhost:8080/addItem", {method: "POST", 
    headers: {
        "Content-Type": "application/json"
     },
     mode: "cors",
     body: payload
    })
        .then(response => {
            if (response.ok) {
                return dispatch(addToCartAction(id));
            } else {
                throw new Error("service went wrong...");
            }
        })
}
       
export const removeItem =(dispatch, id) => {

    let payload = JSON.stringify({id: id, title:"", desc:"", price:0});
    fetch("http://localhost:8080/addItem", {method: "POST", 
    headers: {
        "Content-Type": "application/json"
        },
        mode: "cors",
        body: payload
    })
        .then(response => {
            if (response.ok) {
                return dispatch(addToCartAction(id));
            } else {
                throw new Error("service went wrong...");
            }
        })
}
    

export const subtractQuantity =(dispatch, id) => {

    let payload = JSON.stringify({id: id, title:"", desc:"", price:0});
    fetch("http://localhost:8080/addItem", {method: "POST", 
    headers: {
        "Content-Type": "application/json"
        },
        mode: "cors",
        body: payload
    })
        .then(response => {
            if (response.ok) {
                return dispatch(addToCartAction(id));
            } else {
                throw new Error("service went wrong...");
            }
        })
}

    
const transformProducts = (data) => {
    let products = [];
    data.forEach(element => {
        products.push({id:element.id, title:element.title, desc:element.desc, price:element.price});
    });
    return products;
}
    
const transformCart = (data) => {
    let cart = [];
    data.itemAndQuantities.forEach(element => {
        cart.push(element);
    });
    return cart;
}
