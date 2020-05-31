import React from 'react';
import Inputdata from './input';

// this component has edit, delete features also included in it

class DetailPage extends React.Component {
	constructor(props){
		super(props)

		this.state = {
			edit_clicked: false,
			delete_clicked: false,
			res: [
				{
				id:"00",
				item: "item00",
				quantity: "00",
				price: "$00",
				description: "xxx"
				}
			]
		}
	}

	componentDidMount() {
    	fetch('http://localhost:5000/getDetails',{
			method: "POST",
			headers: { 'Content-Type': 'application/json'},
         	body: JSON.stringify(this.props.location.extraprops)
		})	
		.then(response => response.json())
		.then(data => this.setState({res: data}))
  }

  	editItem = () => {this.setState({edit_clicked: true})}
	
	delItem = () => {
		fetch('http://localhost:5000/DeleteItem/',{
			method: "POST",
			headers: { 'Content-Type': 'application/json'},
         	body: JSON.stringify(this.state.res[0])
		})	
		.then(response => response.json())
		.then(data => this.setState({delete_clicked: true}))
	}
	
	render(){
		if(this.state.edit_clicked){
			return(
				<Inputdata type="UPDATE" preData={this.state.res[0]}/>
			)
		}
		else if(this.state.delete_clicked){
			return (
				<div className="jumbotron text-center" style={{margin:"10% 10%"}} >
				<h3>Deleted Item</h3> 
					<h5 style={{textAlign: "left"}}>
						 {this.state.res.map( (data) => (
						 	<div key={data.id}>
							<br />Id : {data.id}
							<br />Item : {data.item}
							<br />Quantity : {data.quantity}
							<br />Price : {data.price}
							<br />Description : {data.description}
							</div>
						))}
					</h5>
				</div>
			)
		} 
		else{
			return (
				<div className="jumbotron text-center" style={{margin:"10% 10%"}} >
					<h3>Item Details</h3> 
					<h5 style={{textAlign: "left"}}>
						 {this.state.res.map( (data) => (
						 	<div key={data.id}>
							<br />Id : {data.id}
							<br />Item : {data.item}
							<br />Quantity : {data.quantity}
							<br />Price : {data.price}
							<br />Description : {data.description}
							</div>
						))}
	 	   			<button onClick={this.editItem} className="btn btn-info" style = {{margin:"5% 1% 0% 5%"}}>Edit</button>
		   			<button onClick={this.delItem} className="btn btn-info" style = {{margin:"5% 1% 0% 5%"}}>Delete</button>
					</h5>
				</div>
			)
		}

	}
}

export default DetailPage;
