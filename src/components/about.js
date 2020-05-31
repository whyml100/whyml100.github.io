import React from 'react';

class About extends React.Component {

	render(){
		return (
			<div className="jumbotron text-center" style={aboutStyle}>
			<h5> 
				This is AUV-IITK inventory list
				<br />
				<br />
				You can Filter, Search by  properties or may browse the complete inventory manually.
				You can also sort the list based on tags.
			</h5>
			</div>
		);
	}
}

const aboutStyle = {
	margin:"10% 10%",
}

export default About;
