import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
	handleFormSubmit(formProps){
		//call action creator to sign up the user
		//We haven't made this yet.
		this.props.signupUser(formProps);
	}
	renderAlert(){
		if(this.props.errorMessage){
			//Sign up error handling
			return(
				<div className="alert alert-danger">
				<strong>Sorry, </strong> {this.props.errorMessage}
				</div>
			)
		}
	}
	render() {
		const {handleSubmit, fields: {email, password, passwordConfirm}} = this.props;
		return (
			<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label className="thelabel">Email</label>
					<input className="form-control" {...email}/>
					{email.touched && email.error && <div className="error">{email.error}</div>}
				</fieldset>

				<fieldset className="form-group">
					<label className="thelabel">Password</label>
					<input type= "password" className= "form-control" {...password} />
					{password.error}
				</fieldset>

				<fieldset className="form-group">
					<label className="thelabel">Confirm Password</label>
					<input type= "password" className= "form-control" {...passwordConfirm} />
					{passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}					
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign Up</button>
			</form>
		);
	}
}
function validate(formProps){
	const errors = {};

	if(!formProps.email){
		errors.email = 'Please enter a valid e-mail address';
	}
	if (!formProps.password){
		errors.password = 'Please enter a password';
	}
	if (!formProps.passwordConfirm){
		errors.passwordConfirm = 'Please re-enter your password.';
	}
	if (formProps.password !== formProps.passwordConfirm){
		errors.password = 'Passwords much match';
	}
	console.log(formProps)
	return errors;
}
function mapStateToProps(state){
	return{errorMessage:state.auth.error};
}
export default reduxForm({
	form:'signup',
	fields: ['email', 'password', 'passwordConfirm'],
	validate: validate
}, null, actions)(Signup);