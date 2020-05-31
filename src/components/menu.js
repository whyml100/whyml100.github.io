import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../components/search_bar';

class Menu extends React.Component {

	render(){
		return (
		    <div className="navbar navbar-expand-sm bg-dark navbar-dark ">
		    <div className="navbar-nav mr-auto">
		    	<Link className="navbar-brand" to="/browse">Browse</Link>
		    	{/*<Link className="navbar-brand" to="/filter">Filter</Link>*/}
		    	<Link className="navbar-brand" to="/add_item">Add-Item</Link>
		    	<Link className="navbar-brand" to="/logs">Logs</Link>
		    	<Link className="navbar-brand" to="/about">About</Link>
	    	</div>
		    <Search />
		    </div>
		);
	}
}


export default Menu;
