import axios from 'axios';
import {reducer as formReducer} from 'redux-form';

export const CREATE_POSTS = 'CREATE_POSTS';
const ROOT_URL = 'http://rest.learncode.academy/api/quizzle';

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
	};
}