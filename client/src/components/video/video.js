import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './search-bar';
import VideoDetail from './video-detail';

const API_KEY = 'AIzaSyBXUAxsTdoYNv68SZUMGpKOUAUtVGBEt2E';

class Video extends Component {
	constructor(props){
		super(props);
		this.state = {
			videos: [],
			selectedVideo: null
		};
		this.videoSearch('triathlon');
	}
	videoSearch(term){
		YTSearch({key:API_KEY, term:term}, (videos)=> {
			this.setState({
				videos: videos,
				selectedVideo: videos[0]
			});
		});
	}
	render(){
		const videoSearch = _.debounce((term)=>{this.videoSearch(term)}, 300);
		console.log(this.state.videos);
		return(
			<div>
				<SearchBar onSearchTermChange={videoSearch}/>
				<VideoDetail video={this.state.selectedVideo}/>	
			</div>
		);
	}
}
export default Video;