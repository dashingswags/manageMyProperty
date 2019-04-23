import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch, Redirect ,Link } from "react-router-dom";



const baseurl =  window.location.protocol+"//"+window.location.host+'/api';

class Auth extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	isLoginForm:true,
	    	submitting :false,
			formValues : {
			    name:'',
				email:'',
				password:'',
				confirm_password:'',
			},
			errors : {}
	    };
	    this.toggleForm = this.toggleForm.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentWillMount() {
		
		let isLoginForm = this.props.location.pathname == '/auth/login';
		this.setState({
			isLoginForm : isLoginForm,
		})
  	}

	toggleForm(e){
		e.preventDefault();
		this.setState(state => ({
			isLoginForm : !state.isLoginForm
		}));
	}

	handleInputChange(e){

		const target = e.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
	    const state = Object.assign({}, this.state.formValues); 
	    state[name] = value;
	    this.setState({
	    	formValues:state
	    })

	}


	toggleSubmission(){

		this.setState((state) => ({
		  submitting: !state.submitting
		}));

	}

	handleSubmit(e){

		e.preventDefault();
		this.toggleSubmission();
		const postUrl = this.state.isLoginForm? '/login' : '/signup';
		const url = baseurl+postUrl;

	    axios.post(url, this.state.formValues,{
	    	headers : {'Content-Type':'application/json'}
	    })
	    .then((response) => {
	    	
	    	this.toggleSubmission();
	    	this.props.toggleLogIn();
	    	let status = response.status;
		    localStorage.setItem('usertoken',response.data.token);
		    
	    	return this.props.history.push('/dashboard');
	    })
	    .catch((errors) => {
	    	console.log(errors);
	    });

	}

    render(){

		const isLoginForm = this.state.isLoginForm;
		const formValues = this.state.formValues;
		let formInput;

		if (isLoginForm) {
			formInput = <LoginResource 
							formValues={this.state.formValues}
							handleInputChange={this.handleInputChange} />
		}else{
			formInput = <RegisterResource 
							formValues={this.state.formValues}
							handleInputChange={this.handleInputChange}/>
		}

	    return (
	        <div className="auth-bg">
	        	<div className="align-self-center mx-auto">
	        		{/*<h1 className="text-white text-center">
	        			<Link to='/' className="text-white text-decoration-none">ManageMyProperty</Link>
	        		</h1>*/}
			        <div className="card rounded-0">
						<nav className="nav justify-content-center p-2">
							<Link 
								to='#' 
								className={"nav-link rounded-0 mr-2 "+(isLoginForm? 'active' : '')}
								onClick={this.toggleForm}>
								Login
							</Link>
							<Link 
								to='#' 
								className={"nav-link rounded-0 "+(!isLoginForm? 'active' : '')} 
								onClick={this.toggleForm}>
								Sign up
							</Link>
					    </nav>
					    <form className="p-3 auth-form" method="post">
					    	{formInput}
					    	<div className="text-right">
						    	<button 
						    		type="submit" 
					    			className="btn btn-primary"
					    			disabled={this.state.submitting}
					    			onClick={this.handleSubmit}>
					    			{this.state.submitting ? 'Please Wait...' : 'Submit'}
						    	</button>
						    </div>
						</form>
			        </div>
			    </div>
	        </div>
	    )
    }
}
 

function LoginResource(props){
	
	const data = props.formValues;
	return (
		<React.Fragment>
		    <div className="form-group">
			    <label>Email address</label>
			    <input 
			    	name="email"
			    	type="email" 
			    	value={data.email}
			    	className="form-control rounded-0" 
			    	id="email"  
			    	placeholder="Your email" 
			    	autoComplete="new-email"
			    	required
			    	onChange={props.handleInputChange}/>
		    </div>
		    <div className="form-group">
			    <label>Password</label>
			    <input 
			    	name="password"
			    	type="password" 
			    	value={data.password}
			    	className="form-control rounded-0" 
			    	id="user-password" 
			    	placeholder="Password" 
			    	autoComplete="new-password"
			    	required
			    	onChange={props.handleInputChange}/>
		    </div>
	    </React.Fragment>
	);
}

function RegisterResource(props){
	const data = props.formValues;
	return (
		<React.Fragment>
			<span id="registerHelp" className="form-text text-muted">Kindly register as a tenant to have access to occupy our properties.</span>
		    <div className="form-group">
			    <label>Name</label>
			    <input 
			    	name="name"
			    	type="text"
			    	value={data.name} 
			    	className="form-control rounded-0" 
			    	id="name"   
			    	placeholder="Your Name" 
			    	autoComplete="new-name"
			    	required
			    	onChange={props.handleInputChange}/>
		    </div>
		    <LoginResource 
		    	formValues ={data}
				handleInputChange={props.handleInputChange}/>
		  	<div className="form-group">
			    <label>Confirm password</label>
			    <input 
			    	name="confirm_password"
			    	type="password" 
			    	value={data.confirmPassword}
			    	className="form-control rounded-0" 
			    	id="user-password-confirm" 
			    	placeholder="Confirm Password" 
			    	autoComplete="new-conform-password"
			    	required
			    	onChange={props.handleInputChange}/>
		    </div>
		</React.Fragment>
	)
}

export default Auth;