import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectBand} from '../actions/index';
import {bindActionCreators} from 'redux';


//WHERE DOES THIS GO
//:onClick={()=>this.props.selectBand(bands)}


class BandList extends Component{
	renderList(){
		return this.props.bands.map((bands)=>{
			return(
				<li key={bands.name} onClick={()=>this.props.selectBand(bands)} className="list-group-item">{bands.name}</li>
			);
		});
	}
	render(){
		return(
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
		);
	}
}
function mapStateToProps(state){
	return{
		bands: state.bands
	};
}
function mapDispatchToProps(dispatch){
	//Whenever selectBand is called, this will pass the result to ALL of our reducers
	return bindActionCreators({selectBand:selectBand}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(BandList);