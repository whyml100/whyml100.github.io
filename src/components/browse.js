import React from 'react';
import Loaddata from './load_data';

class Browse extends React.Component {

	render(){
		return (
			<div>
			<h1> Browse </h1>
			<Loaddata request="everything" />
			</div>
		);
	}
}

export default Browse;
