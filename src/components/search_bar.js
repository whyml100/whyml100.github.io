import React from 'react';
import { Link } from 'react-router-dom';

var todata = {
		 		pathname: '/search',
	 			extraprops: { searchstr: ""}
		 	}

class Search extends React.Component {

	srcref = React.createRef();

	srcchanged = () => {
		todata.extraprops.searchstr = this.srcref.current.value;
	}

	render(){
		return (
	    	<div className="form-inline" >
	     	<input ref={this.srcref} onChange={this.srcchanged} className="form-control mr-sm-2" type="text" placeholder="Search..." />
		 	<Link to={todata}
		 	className="btn btn-info">
		 	GO
		 	</Link>
	    	</div>
		);
	}
}


export default Search;
