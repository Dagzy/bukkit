const SELECT_BAND = 'SELECT_BAND';

export function selectBand(band){
	console.log("You have selected:", band.name);
	//selectBand is an ActionCreator, it needs to return an action
	//which is an object that must have a type property
	return{
		type: SELECT_BAND,
		payload: band
	};
}