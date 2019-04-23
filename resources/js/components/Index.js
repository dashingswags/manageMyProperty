import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route,Link } from "react-router-dom";

class Index extends Component {

	componentWillUnmount(){
		//alert('iam going home');
	}

    render(){
	    return (
	        <div className="container my-5">
	        	<hr className="my-4" />
	        	<div className="jumbotron bg-light white-text">
	        		<h1 className="display-4">Welcome</h1>
	        		<p className="lead">We bring you the best of real estate properties for hire</p>
	        		<p className="lead">
					    <Link className="btn btn-primary btn-lg" to="auth/signup" role="button">Get Started</Link>
					</p>
	        	</div>
	        </div>
	    )
    }

}

export default Index;