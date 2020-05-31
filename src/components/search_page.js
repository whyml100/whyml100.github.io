import React from 'react';
import Loaddata from './load_data';

class Searchpage extends React.Component {

	render(){
		return (
			<div>
			<h1> Search Page </h1>
			<Loaddata request={this.props.location.extraprops.searchstr} />
			</div>
		);
	}
}

export default Searchpage;
