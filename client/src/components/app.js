import React, {Component} from 'react';
import NavBarHeader from './Nav';
import Video from './video/video';
import BandList from './Containers/BandList';
import Signin from './auth/signin';

export default class App extends Component{
	render(){
		return (
			
			<div>

				<NavBarHeader />
				<Video />
				<Signin />
				{this.props.children}
			</div>
		);
	}
}