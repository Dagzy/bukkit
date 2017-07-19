import axios from 'axios';
import {reducer as formReducer} from 'redux-form';
import {browserHistory} from 'react-router';
import authReducer from '../reducers/auth_reducer';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, CREATE_POSTS, FETCH_POSTS, DELETE_POST, FETCH_POST, UPDATE_POST} from './types';


//export const CREATE_POSTS = 'CREATE_POSTS';

const ROOT_URL = 'http://localhost:3000';

var config = {
	headers: { Authorization: localStorage.getItem('token')}
}

export function createPost(props){
	return function(dispatch){
		console.log("Create Post");
		axios.post(`${ROOT_URL}/new-item`, {props}, config)
		.then(request => {
			dispatch({
				type: CREATE_POSTS,
				payload: request
			});
			console.log(browserHistory);
			browserHistory.push('/items');
		});
	}
}

export function signinUser ({email, password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signin`, {email, password})
		.then(response => {
			//This only kickstarts if the request was good...
			//We not update the state to indicate authenticated user
			dispatch ({ type: AUTH_USER });
			localStorage.setItem('token', response.data.token);
			//This sends us off to the /newitem view
			browserHistory.push('/new-item');
		})
		.catch(response => dispatch(authError("Bad login info")));
	};
}
//purpose of flag is to catch unauth_user case.
//flips auth flag to false and there won't be any links associate with them
//other thin to do is get rid of token
export function signoutUser(){
	localStorage.removeItem('token');
	return {type: UNAUTH_USER};
}

export function authError(error){
	return{
		type: AUTH_ERROR,
		payload: error
	};
}
export function signupUser({email, password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signup`, {email, password})
			.then(response => {
				dispatch({type: AUTH_USER});
				//update the token
				localStorage.setItem('token', response.data.token);
				browserHistory.push('/new-item');
			})
			.catch(response => dispatch(authError(response.data.error)));
	}
}
export function fetchPosts(){
	return function(dispatch){
		axios.get(`${ROOT_URL}/items`, config)
		.then((response)=>{
			console.log("Response", response)
			dispatch({
				type: FETCH_POSTS,
				payload: response
			});
		});
	}
}
export function fetchPost(id){
	return function(dispatch){
		axios.get(`${ROOT_URL}/items/${id}`, config)
		.then((response) => {
			console.log("Response", response)
			dispatch({
				type: FETCH_POST,
				payload: response
			});
		});
	}
}
export function deletePost(id){
	return function(dispatch){
		axios.delete(`${ROOT_URL}/items/${id}`, config)
		.then((response) => {
			dispatch({
				type: DELETE_POST,
				payload: response
			})
			browserHistory.push('/items');
		});
	}
}
export function updatePost(props, id){
	return function(dispatch){
		axios.put(`${ROOT_URL}/items/${id}`, {props}, config)
		.then(response => {
			dispatch({
				type: UPDATE_POST,
				payload: response
			});
			browserHistory.push('/items');
		});
	}
}