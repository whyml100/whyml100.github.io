import React from 'react';
import Logo from './auv_logo.png';



class Header extends React.Component {

	render(){
		return (
		    <div > 
		    	<h2 className="jumbotron text-center" style={{marginBottom:"0"}}>
		    		<img style={imgStyle} src={Logo} alt="websitelogo"/>
		    		{" "}
		    		INVENTORY
	    		</h2>
		    </div>
		);
	}
}

const imgStyle = {
    maxHeight:"10vh",
    maxWidth:"15vw",
    opacity:"0.8"
}

export default Header;
