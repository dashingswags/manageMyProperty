import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import Auth from './Auth';
import Master from './Master';

const baseComponent =  (
	<Router>
		<Switch>
			<Route exact path="/" component={Auth}/>
			<Route path='/app' component={Master} />
		</Switch>
    </Router>
);

if (document.getElementById('app')) {
    ReactDOM.render( baseComponent, document.getElementById('app'));
}