import React from 'react';

// this component loads the data recieved from backend into a table or similar structure

class Loadlog extends React.Component {

	// this runs before component is rendered
	constructor(props){
		super(props)

		this.state = {

			loglist : [
				{
				timestamp:"00/00/00, 00:00:00 AM/PM",
				type: "xxx",
				activity: "xxxx"
				}
			]
		}
	}

	// this runs after component is rendered
	componentDidMount() {
    this.getlog();
  }

  	// fetching the data from server
	getlog() {
		fetch('http://localhost:5000/getlog/')
		.then(response => response.json())
		.then(data => this.setState({loglist : data}))
	}	

	render(){
		return (

			<div>
				<table className="table table-hover">
					<thead className="thead-light">
						<tr>
							<th scope="col">Timestamp</th>
							<th scope="col">Type</th>
							<th scope="col">Activity</th>
						</tr>
					</thead>
					<tbody>
						{this.state.loglist.map( (data) => (
							<tr key={data.timestamp}>
							<td>{data.timestamp}</td>
							<td>{data.type}</td>
							<td>{data.activity}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
			
	}
}



export default Loadlog;
