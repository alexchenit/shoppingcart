import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllProducts, addProductToCart } from '../util/services';

 class Home extends Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    } 

    componentDidMount() {
        console.log("getDate() is invoked;");
        this.props.getProducts();
    }

    handleClick = (id)=>{
        this.props.addToCart(id); 
    }

    render(){
        let itemList = this.props.products.map(item=>{
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
      products: state.products,
      cart: state.cart,
      total: state.total,
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{addProductToCart(dispatch,id)},
        getProducts: ()=>{getAllProducts(dispatch)}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)