import { GET_PRODUCTS, ADD_TO_CART,REMOVE_ITEM, DEC_FROM_CART, INC_TO_CART, GET_CART } from '../actions/action-types/CartActionTypes';


const initState = {
    products: [],
    cart: [],
    total: 0,
}

const cartReducer= (state = initState,action)=>{

    let product = state.products.find(item=> item.id === action.id)
    let existed_item= state.cart.find(item=> action.id === item.id)

    //INSIDE HOME COMPONENT
    switch (action.type) {

        case GET_PRODUCTS:
            if (action.products) {
                let products = JSON.parse(JSON.stringify(action.products));
                return Object.assign({}, state, {products: products});
            }
            break;
        case GET_CART:
            if (action.cart) {
                let cart = JSON.parse(JSON.stringify(action.cart));
                return Object.assign({}, state, {cart: cart});
            }
            break;
        case ADD_TO_CART:
        case INC_TO_CART:
            let newTotal = state.total + product.price;
            let newCart = JSON.parse(JSON.stringify(state.cart));

            if (existed_item) {
                newCart[product.id].quantity += 1;
            }
            else{
                let item = { id: product.id, quantity: 1};
                newCart.push(item);
            }
            return Object.assign({}, state, {cart: newCart, total: newTotal})

        case DEC_FROM_CART:
            if (existed_item.quantity > 1) {
                let newCart = JSON.parse(JSON.stringify(state.cart));
                newCart[action.id].quantity--;
                return Object.assign({}, state, {cart: newCart, total: newTotal})
            }
            else if (existed_item.quantity === 1) {
                let newCart = state.cart.filter(item=>item.id !== action.id);
                let newTotal = state.total - product.price;
                return Object.assign({}, state, {cart: newCart, total: newTotal})
            }
            return state;

        case REMOVE_ITEM:
            let productToRemove= state.cart.find(item=> action.id === item.id)
            newCart = state.cart.filter(item=> action.id !== item.id)
            
            newTotal = state.total - (state.products[action.id].price * productToRemove.quantity )
            return Object.assign({}, state, {cart: newCart, total: newTotal})

        default:
            return state;
    }
    
}

export default cartReducer;