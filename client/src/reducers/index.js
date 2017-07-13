import{combineReducers}from'redux';
import BandsReducer from './reducer_bands';
import SelectedBand from './reducer_selectedband';
import {reducer as formReducer} from 'redux-form';

//Define the properties of our application state here

const rootReducer = combineReducers({
	form: formReducer
});
export default rootReducer;