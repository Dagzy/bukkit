import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, DropdownButton, MenuItem, CollapsibleNav} from 'react-bootstrap';

class NavBarHeader extends Component {
	render(){
		return(
			<Navbar>
				<Navbar.Header>
					<Navbar.Brand>
						<a href="#">Bukkitlist</a>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<NavItem eventKey={1} href="#">Sign In</NavItem>
					<NavItem eventKey={2} href="#">Sign Up</NavItem>
					<NavDropdown eventKey={3} title="Ninja Moves" id="basic-nav-dropdown">
						<MenuItem eventKey={3.1}>Action</MenuItem>
						<MenuItem eventKey={3.2}>Another Action</MenuItem>
						<MenuItem eventKey={3.3}>Something Else Here</MenuItem>
						<MenuItem divider />
						<MenuItem eventKey={3.4}>Seperated Link</MenuItem>
					</NavDropdown>
				</Nav>
			</Navbar>
		);
	}
}
export default NavBarHeader;