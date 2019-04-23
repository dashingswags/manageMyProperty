import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class AppNav extends Component {

	constructor(props){
		super(props);
		this.state = {
			landingPage : true
		}
	}


    render(){

	    return (
		    
			<nav className="nav flex-column p-2 side-nav">
				<br />
				<Link to='/dashboard' className="nav-link rounded-0">
					Dashboard
				</Link>
				<Link to='/properties' className="nav-link rounded-0">
					Properties
				</Link>
				<Link to='/tenants' className="nav-link rounded-0">
					Tenants
				</Link>
				<Link to='/managers' className="nav-link rounded-0">
					Managers
				</Link>
		    </nav>
		    
	    )
    }

}

export default AppNav;