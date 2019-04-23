import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from 'axios';

import Index from './Index';
import Nav from './Nav';
import Auth from './Auth';
import AppLayout from './AppLayout';


class BaseComponent extends Component {

	constructor(props){

		super(props);
		this.state = {
			loggedIn : false,
		}
		this.handleLogOut = this.handleLogOut.bind(this);
		this.toggleLogIn  = this.toggleLogIn.bind(this);

	}

	handleLogOut(e){
		
		e.preventDefault();
		this.toggleLogIn();
		localStorage.removeItem('usertoken');
		window.location.replace(window.location.origin);
	}

	toggleLogIn(){

		this.setState((state)=>({
			loggedIn : !state.loggedIn
		}));
	}

	render(){

		const loggedIn       = this.state.loggedIn;
		const viewCOmponent  = !loggedIn  ?  <GuestView toggleLogIn={this.toggleLogIn} /> : <AppLayout />;

		return (
			<Router>
				<div className="container-fluid px-0">
					<Nav loggedIn={this.state.loggedIn} handleLogOut={this.handleLogOut} />
					{viewCOmponent}
			    </div>
		    </Router>
		)
	}

}

function GuestView(props){
	
	return (
		<Switch>
			<Route exact path="/" component={Index}/>
			<Route 
				path="/auth" 
				render={(args) => <Auth {...args} toggleLogIn={props.toggleLogIn} />}
				/>
		</Switch>
	)

}

if (document.getElementById('app')) {
    ReactDOM.render( <BaseComponent />, document.getElementById('app'));
}