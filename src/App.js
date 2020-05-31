import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/header.js';
import Menubar from './components/menu.js';
import Browse from './components/browse';
import Filter from './components/filter';
import Logs from './components/logs';
import About from './components/about';
import Additem from './components/add_item';
import Searchpage from './components/search_page';
import Detailpage from './components/detail_page';


class App extends React.Component {

	render(){
		return (
			<Router>
			    <div className="App" > 	
			    	<Header />
			    	<Menubar />
			    	<Route exact path="/" render={props => (
			    		<div>
			    		</div>
			    		)} />
			    	<Route path="/browse" component={Browse} />
			    	{/*<Route path="/filter" component={Filter} />*/}
			    	<Route path="/logs" component={Logs} />
			    	<Route path="/about" component={About} />
			    	<Route path="/add_item" component={Additem} />
			    	<Route path="/search" component={Searchpage}  />
			    	<Route path="/detail_page" component={Detailpage}  />


			    </div>
		    </Router>
		);
	}
}

export default App;
