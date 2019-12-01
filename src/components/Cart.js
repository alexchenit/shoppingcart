import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem,addQuantity,subtractQuantity} from '../actions/cartActions';


class Cart extends Component{

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
              
        let addedItems = this.props.items.length ?
            (  
                this.props.items.map(item=>{
                    return(
                       
                        <tr className="collection-item avatar" key={item.id}>
                            <td>
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
                                            <button type="button" class="btn">
                                                <Link to="/cart"><span class="glyphicon glyphicon-plus" onClick={()=>{this.handleAddQuantity(item.id)}}></span></Link>
                                            </button>
                                            <button type="button" class="btn">
                                                <Link to="/cart"><span class="glyphicon glyphicon-minus" onClick={()=>{this.handleSubtractQuantity(item.id)}}></span></Link>
                                            </button>
                                            <button type="button" class="btn btn-primary">
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
        items: state.addedItems,
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)