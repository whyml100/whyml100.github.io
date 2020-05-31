import React from 'react';
import { Redirect } from "react-router-dom"; 

// this component loads the data recieved from backend into a table or similar structure

class Loaddata extends React.Component {

	// this runs before component is rendered
	constructor(props){
		super(props)

		this.state = {
			item_clicked: false,
			datalist : [
				{
				id:"00",
				item: "item00",
				quantity: "00",
				price: "$00"
				}
			]
		}
	}

	// for search functionality
	getSnapshotBeforeUpdate(prevProps, prevState) {
		if(prevProps.request !== this.props.request) {
			this.getData();
		}
  }
  // this runs after component is updated
	componentDidUpdate() {
    	console.log("updated component");
    	}

	// this runs after component is rendered
	componentDidMount() {
    this.getData();
  }

  	// fetching the data from server
	getData() {
		fetch('http://localhost:5000/getdbdata/',{
				method: "POST",
				headers: { 'Content-Type': 'application/json'},
	         	body: JSON.stringify({request: this.props.request})
			})
			.then(response => response.json())
			.then(data => this.setState({datalist : data}))
	
	}

	// show details of item when it is clicked
	showDetails = (event) => {
		const dataid = event.currentTarget.getAttribute('dataid');
		console.log("entry clicked " , dataid) ;
		//this.props.history.push('/detail_page')
		this.setState({item_clicked: dataid})
		
	}	

	render(){
			if(this.state.item_clicked){
				return <Redirect push to={{
		 			pathname: "/detail_page",
	 				extraprops: { itemId: this.state.item_clicked}
		 		}} />
			}
		return (
			<div>
				<table className="table table-hover">
					<thead className="thead-light">
						<tr>
							<th scope="col">Id</th>
							<th scope="col">Item</th>
							<th scope="col">Quantity</th>
							<th scope="col">Price</th>
						</tr>
					</thead>
					<tbody>
						{this.state.datalist.map( (data) => (
							<tr  key={data.id} onClick={this.showDetails} dataid={data.id} style={{cursor: "pointer"}}>
							<th scope="row">{data.id}</th>
							<td>{data.item}</td>
							<td>{data.quantity}</td>
							<td>{data.price}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
			
	}
}



export default Loaddata;
