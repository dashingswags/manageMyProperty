import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Link ,Switch} from "react-router-dom";

import AppNav from './AppNav';
import Property from './main/Property';

class AppLayout extends Component {

	constructor(props){
		super(props);
		this.state = {
			navLinks: {
				dashboardUrl  : false,
				propertiesUrl : false,
				tenantsUrl    : false,
				managersUrl   : false,
			}
		}
	}
	
    render(){

	    return (
	    	<div className="app-layout">
	    		<AppNav navLinks={this.state.navLinks}/>
			    <div className="content bg-light pt-5">
					<Switch>
						<Route path="/dashboard" component={Property}/>
					</Switch>
			    </div>
		    </div>
	    )
    }

}

export default AppLayout;