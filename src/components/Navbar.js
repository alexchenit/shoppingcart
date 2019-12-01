
import React from 'react';
import { Link } from 'react-router-dom';

 const Navbar = ()=>{
    return(
            <React.Fragment>
                <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header navbar-brand">
                        <Link to="/">Shopping</Link>
                    </div>
                    <div  className="navbar-header navbar-brand navbar-right">
                        <Link to="/cart"><span className="glyphicon glyphicon-shopping-cart"></span>My Cart</Link>
                    </div>
                </div>
                </nav>
            </React.Fragment>
    )
}

export default Navbar;