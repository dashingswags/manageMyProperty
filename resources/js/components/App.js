import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class App extends Component {

	constructor(){
		super();
		this.state = {
			properties : [],
			listItems  : []
		}
	}

	componentWillMount(){
		axios.get('/api/properties').then(response => {
			this.setState({
				properties : response.data
			});

			this.setState({
				listItems : this.state.properties.data
			})

		}).catch(errors =>{
			console.log(errors);
		})
	}

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Property List</div>
                            <table className="table">
                            	<thead>
                            		<tr>
                            		    <th>S/N</th>
	                            		<th>Title</th>
	                            		<th>description</th>
                            		</tr>
                            	</thead>
                            	<tbody>{this.state.listItems.map(
				                    	function(item,key){
					                    	return (<tr key={item.id}>
							                    		<td>{item.id}</td>
							                    		<td>{item.title}</td>
							                    		<td>{item.description}</td>
							                    	</tr>)
				                    	} 
				                    )}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render( <App/>, document.getElementById('app'));
}