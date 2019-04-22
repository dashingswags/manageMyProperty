import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import axios from 'axios';
//import Master from './Master';

class Property extends Component {

	constructor(){
		super();
		this.state = {
			properties : {data : []}
		}
	}

	componentWillMount(){

		axios.get('/api/properties').then(response => {
			this.setState({
				properties : response.data
			});
		}).catch(errors =>{
			console.log(errors);
		})
	}

	renderProperties(){
		
		return this.state.properties.data.map(item => {
				return (<tr key={item.id}>
	                		<td>{item.id}</td>
	                		<td>{item.title}</td>
	                		<td>{item.description}</td>
	                	</tr>)
		})
	}

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="">Property List</div>
                            <table className="table table-hover">
                            	<thead>
                            		<tr>
                            		    <th>S/N</th>
	                            		<th>Title</th>
	                            		<th>description</th>
                            		</tr>
                            	</thead>
                            	<tbody>{this.renderProperties()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Property;