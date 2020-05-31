import React from 'react';

//this component can add or update a documnet

var data;
var error_code;
class Inputdata extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            submitted: false
        }
    }


	idref = React.createRef()
	itemref = React.createRef()
	quantityref = React.createRef()
	priceref = React.createRef()
	pref = React.createRef()
	descriptionref = React.createRef()

	check_data() {

		if(data.id === "" && data.item === "" && data.quantity === "" && data.price === "" ) error_code = "all_empty";

		if(data.id === "" ) data.id = "---";
		if(data.item === "" ) data.item = "---";
		if(data.quantity === "" ) data.quantity = "---";
		if(data.price === "" ) data.price = "---";
		if(data.description === "" ) data.description = "---";

	}

	makeReq = () => {

		// making object to send
		data = {
			id : this.idref.current.value,
			item : this.itemref.current.value,
			quantity : this.quantityref.current.value,
			price : this.priceref.current.value,
			description : this.descriptionref.current.value
		}

		this.check_data()
		if(error_code === "all_empty"){
			this.pref.current.innerHTML = "Please enter some data";
			error_code = "";
		}
		// request
		else{
			console.log("sending")
			console.log(data)

			// sending request
			fetch('http://localhost:5000/' + this.props.type + 'item/',{
				method: "POST",
				headers: { 'Content-Type': 'application/json'},
	         	body: JSON.stringify(data)
			})
			.then(response => response.json())
			.then(data => this.setState({submitted: true}))
		}
	}

	reset = () => {
		this.setState({submitted: false})
	}


	render(){
		if(this.state.submitted){
			return (
				<div className="jumbotron text-center" style={{margin:"10% 10%"}} >
				<h3>Form submitted</h3> 
					<h5 style={{textAlign: "left"}}>
						 <br/> Id: {data.id}
						 <br/> Item: {data.item}
						 <br/> Quantity: {data.quantity}
						 <br/> Price: {data.price}
						 <br/> Description: {data.description}
					</h5>
		   			<button onClick={this.reset} className="btn btn-info" >{this.props.type} AGAIN</button>
				</div>
			)
		}

		else {
			return (
				<div className="form-horizontal" style={{margin:"10% 30%"}}>					
					<div className="form-group row">
						<label className="col-sm-2 col-form-label">ID :</label>
						<input name="id" ref={this.idref} className="form-control" type="text" defaultValue={this.props.preData.id} placeholder="id" />
					</div>

					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Item :</label>
						<input name="item" ref={this.itemref} className="form-control" type="text" defaultValue={this.props.preData.item} placeholder="item" />
					</div>

					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Quantity :</label>
						<input name="quantity" ref={this.quantityref} className="form-control" type="text" defaultValue={this.props.preData.quantity} placeholder="quantity" />
					</div>

					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Price :</label>
						<input name="price" ref={this.priceref} className="form-control" type="text" defaultValue={this.props.preData.price} placeholder="price" />
					</div>

					<div className="form-group row">
						<label className="col-sm-2 col-form-label">Description :</label>
						<input name="price" ref={this.descriptionref} className="form-control" type="text" defaultValue={this.props.preData.description} placeholder="description" />
					</div>

		   			<button onClick={this.makeReq} className="btn btn-info" >{this.props.type} ITEM</button>
		   			<p ref={this.pref} />
				</div>
			)
		}
	}
}

export default Inputdata;
