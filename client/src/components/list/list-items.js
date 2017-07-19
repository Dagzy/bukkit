import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';
import {Link} from 'react-router';
import axios from 'axios';

const ROOT_URL = 'http://localhost:3000';
const config = {
	headers: {Authorization: localStorage.getItem('token')}
}
class ListItems extends Component {
	componentWillMount(){
		this.props.fetchPosts();
	}
	renderItems(){
		return this.props.posts.map((post) => {
			return(
				<li className="list-group-item" key={post._id}>
					<Link to= {"items/" + post._id}>
						<span className="pull-xs-right"><strong>{post.title} - </strong></span>
						<span className="pull-xs-left">{post.topic}</span>
					</Link>
				</li> 
			);
		});
	}
	render() {
		if (this.props.posts == 0){
			return(
				<div><h3>Still loading...</h3></div>
			);
		}else{
			return(
				<div className="col-md-4">
					<div className="row">
						<div className="text-sm-6 text-xs-left"> 
							<h3 className="thelabel" className="text-xs-left">Lists</h3>
						</div>
						<div>
							<Link to="/new-item" className="btn btn-primary">
								Add a list item
							</Link>
						</div>
					</div>
					<div id="space"></div>
					<ul className="list-group">
						{this.renderItems()}
					</ul>
				</div>
			);
		}
	}
}
function mapStateToProps(state){
	return {posts: state.posts.all};
}
export default connect(mapStateToProps, actions)(ListItems);


{/*)

These functions are replaced by above componentWillMount
	constructor(props){
		super(props);
		this.state = {
			posts: []
		}
	} 
	componentWillMount(){
		axios.get(`${ROOT_URL}/items`, config)
		.then((response) => {
			const posts = response.data;
			console.log("Response", response)
			this.setState({
				posts: [...posts]
			})
		})
	} */}