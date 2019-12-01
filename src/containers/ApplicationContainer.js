import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Cart from '../components/Cart';

import '../index.css';

class ApplicationContainer extends Component {
  render() {
    return (
       <BrowserRouter>
            <React.Fragment>
            
              <Navbar/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/cart" component={Cart}/>
                </Switch>
             </React.Fragment>
       </BrowserRouter>
      
    );
  }
}

export default ApplicationContainer;