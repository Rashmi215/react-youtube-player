  import React, { Component } from 'react';
  import SearchBar from './components/search_bar';
  import YTSearch from 'youtube-api-search';
  import VideoList from './components/video_list';
  import VideoDetail from './components/video_detail';
  import _ from 'lodash';
  const API_KEY = 'AIzaSyAgeUXJ6eMXmirNJmF7Hg6rG5ceaBiwO7U';

  class App extends Component {
    constructor(props){
      super(props);
      this.state = {
        videos : [],
        selectedVideo : null
       };
      this.videoSearch('React Tutorials');
    }
    videoSearch(searchTerm){
      YTSearch({key:API_KEY ,term:searchTerm}, (data)=>{
        this.setState({ videos:data, selectedVideo:data[0]});
      });
    }
    render() {
     const videoSearch = _.debounce((term)=>{this.videoSearch(term)}, 300);

      return (
        <div>
          <SearchBar onSearchTermChange = {videoSearch} />
          <VideoDetail video = {this.state.selectedVideo} />
          <VideoList
          onVideoSelect = {selectedVideo =>this.setState( {selectedVideo } )}
          videos = {this.state.videos} />
        </div>
      );
    }
  }

  export default App;
