import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link} from 'react-router';

class NavBarHeader extends Component {
	renderLinks(){
		if(this.props.authenticated){
			return <NavItem href="signout">Sign Out</NavItem>
		}else{
			return[
			<NavItem key={1} href="signin">Sign In</NavItem>,
			<NavItem key={2} href="signup">Sign Up</NavItem>
			];
		}
	}
	render(){
		return(
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Triathlon Training Authority</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					{this.renderLinks()}
					<NavDropdown key={3} title="Training Sources" id="basic-nav-dropdown">
						<MenuItem key={3.1} href="https://www.globalcyclingnetwork.com/">Global Cycling Network</MenuItem>
						<MenuItem key={3.2} href="http://www.runnersforum.com/index.php">Runner's Forum</MenuItem>
						<MenuItem key={3.3} href="https://www.swimmingworldmagazine.com/">Swimming World</MenuItem>
						<MenuItem divider />
						<MenuItem key={3.4}>Seperated Link</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar>
		);
	}
}
	function mapStateToProps(state){
		return{
			authenticated: state.auth.authenticated
		};
	}
export default connect(mapStateToProps)(NavBarHeader);