import ipad from '../images/ipad.jpg'
import iphone from '../images/iphone.jpg'
import iwatch from '../images/iwatch.jpg'
import macbook from '../images/macbook.jpg'

import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY } from '../actions/action-types/CartActionTypes';


const initState = {
    items: [
        {id:1,title:"ipad", desc: "ipad", price:450,img:ipad},
        {id:2,title:"iphone", desc: "iphone", price:800,img: iphone},
        {id:3,title:"iwatch", desc: "iwatch",price:120,img: iwatch},
        {id:4,title:"macbook", desc: "macbook", price:2600,img:macbook}
    ],
    addedItems:[],
    total: 0

}

const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1;
            localStorage.setItem("shoppingcart", JSON.stringify(state.addedItems));
            return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            localStorage.setItem("shoppingcart", JSON.stringify(state.addedItems));
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price;
          localStorage.setItem("shoppingcart", JSON.stringify(state.addedItems));
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            localStorage.setItem("shoppingcart", JSON.stringify(state.addedItems));
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }
    
  else{
    return state
    }
    
}

export default cartReducer;