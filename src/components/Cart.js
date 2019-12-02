import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart, addProductToCart, removeItem, subtractQuantity } from '../util/services';


class Cart extends Component{

    componentDidMount() {
        console.log("getCart() is invoked;");
        this.props.getCart();
    }


    //to remove the item completely
    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }
    render(){
              
        let addedItems = this.props.cart.length ?
            (  
                this.props.cart.map(item=>{
                    return(
                       
                        <tr key={"id" + item.id}>
                            <td key={"title"+ item.id}>
                                    <div> 
                                        <h4>{item.title}</h4>
                                        <img src={item.img} alt={item.img} className=""/>
                                    </div>
                                
                                    <div>
                                        <p><b>Price: ${item.price}</b></p> 
                                        <p>
                                            <b>Quantity: {item.quantity}</b> 
                                        </p>
                                        <div>
                                            <button type="button" className="btn">
                                                <Link to="/cart"><span className="glyphicon glyphicon-plus" onClick={()=>{this.handleAddQuantity(item.id)}}></span></Link>
                                            </button>
                                            <button type="button" className="btn">
                                                <Link to="/cart"><span className="glyphicon glyphicon-minus" onClick={()=>{this.handleSubtractQuantity(item.id)}}></span></Link>
                                            </button>
                                            <button type="button" className="btn btn-primary">
                                                <span onClick={()=>{this.handleRemove(item.id)}}>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                            </td>    
                        </tr>
                    )
                })
            ):

             (
                <tr>
                    <td><p>Nothing.</p></td>
                </tr>
             )
       return(
            <div className="container">
                <h3>You have ordered:</h3>
                <table className="table padded" border="1">
                    <tbody>
                        {addedItems}
                    </tbody>
                </table>
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return{
        products: state.products,
        cart: state.cart,
        total: state.total
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        getCart: ()=>{getCart(dispatch)},
        removeItem: (id)=>{removeItem(dispatch,id)},
        addQuantity: (id)=>{addProductToCart(dispatch, id)},
        subtractQuantity: (id)=>{subtractQuantity(dispatch, id)}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)