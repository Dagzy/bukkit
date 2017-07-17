import React, {Component} from 'react';
import NavBarHeader from './Nav';
import Video from './video/video';
import BandList from './Containers/BandList';
import Signin from './auth/signin';
import ListItem from './list/new-list-item';
import ListShow from './list/list-items';

export default class App extends Component{
	render(){
		return (
			
			<div>
				<NavBarHeader />
				<Video />
				
				{this.props.children}
			
			</div>
		);
	}
}