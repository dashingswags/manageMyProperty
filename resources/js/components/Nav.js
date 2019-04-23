import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";

class Nav extends Component {

	constructor(props){
		super(props);
	}


    render(){

	    return (
			<nav className="navbar fixed-top navbar-expand-lg bg-white border-bottom">
				<Link className="navbar-brand" to="/">ManageMyProperty</Link>
				<button 
			  		className="navbar-toggler" 
			  		type="button" 
			  		data-toggle="collapse" 
			  		data-target="#navbarNav" 
			  		aria-controls="navbarNav" 
			  		aria-expanded="false" 
			  		aria-label="Toggle navigation">
					<span className="fa fa-bars"></span>
				</button>

				<div className="collapse navbar-collapse " id="navbarNav">
				    <ul className="navbar-nav ml-md-auto">
				    	{!this.props.loggedIn ? (
				    		<React.Fragment>
							    <li className="nav-item">
							        <Link className="nav-link" to="/auth/login">Login</Link>
							    </li>
		 						<li className="nav-item">
							        <Link className="nav-link" to="/auth/signup">Sign Up</Link>
							    </li>
							</React.Fragment>
				    	):(
				    		<React.Fragment>
					    		<li className="nav-item">
							        <Link className="nav-link" to="/" onClick={(e) => this.props.handleLogOut(e)}>Logout</Link>
							    </li>
						    </React.Fragment>
				    	)}

				    </ul>
				</div>
			</nav>
	    )
	    
    }

}

export default Nav;