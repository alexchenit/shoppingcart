import { ADD_TO_CART,REMOVE_ITEM,DEC_FROM_CART,INC_TO_CART, GET_PRODUCTS, GET_CART } from './action-types/CartActionTypes';

export const addToCartAction= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}
export const removeItemAction=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}
export const subtractQuantityAction=(id)=>{
    return{
        type: DEC_FROM_CART,
        id
    }
}
export const addQuantityAction=(id)=>{
    return{
        type: INC_TO_CART,
        id
    }
}
export const getProductsAction=(products)=>{
    return {
        type: GET_PRODUCTS,
        products: products
    }
}
export const getCartAction=(cart)=>{
    return {
        type: GET_CART,
        cart: cart
    }
}