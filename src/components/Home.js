import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';

 class Home extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.getStoredItems = this.getStoredItems.bind(this);
        this.getStoredItems();
    } 

    getStoredItems = ()=>{
        let storedItems = JSON.parse(localStorage.getItem('shoppingcart')) || '';
        if (storedItems != null && storedItems.length > 0) {
            storedItems.forEach(item => {
                this.props.addToCart(item.id)
            });; 
        }        
    }

    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    render(){
        let itemList = this.props.items.map(item=>{
            return(
                <tr  key={item.id}>
                        <td >
                            <ul>
                                <li><h2>{item.title}</h2></li>
                                <li><img src={item.img} alt={item.title}/></li>
                                <li><button type="button" className="btn btn-primary" onClick={()=>{this.handleClick(item.id)}}>add</button></li>
                            </ul>
                        </td>

                        <td>
                            <p><b>Price: ${item.price}</b></p>
                        </td>
                 </tr>

            )
        })

        return(
            <div className="container">
                <h3 className="center">Our items</h3>
                <table className="table padded" border="1">
                    <tbody>
                        {itemList}
                    </tbody>
                </table>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)