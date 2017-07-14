import axios from 'axios';
import {reducer as formReducer} from 'redux-form';
import {browserHistory} from 'react-router';
import authReducer from '../reducers/auth_reducer';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

export const CREATE_POSTS = 'CREATE_POSTS';
//const ROOT_URL = 'http://rest.learncode.academy/api/quizzle';
const ROOT_URL = 'http://localhost:3000';

export function createPost(props){
	const request = axios.post(`${ROOT_URL}/posts`, props);
	return{
		type: CREATE_POSTS,
		payload: request
	};
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