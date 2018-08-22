//This is the root Component in which every other component will live off of.

//React is the module that helps you in converting files, compiling files and making sure the other react modules are working.
import React, { Component } from 'react';
//React made changes to the way it works with your components, so now there is a react-dom module that will take care of taking your
//components and know where to put them in the dom.
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
//Because SearchBar and VideoList are self-made functional components, when importing them we have to specify the full path.
import SearchBar from './components/search_bar';
import VideoList from "./components/video_list";
import VideoPlayer from './components/video_player';
//Const is an addition to the  ES6 syntax, which translates basically to a var, but a const will never change its value after declaration
const API_KEY = 'AIzaSyAheBEVRk7ORS6TUKu3FEAuuOzprJh7hnY';

//This is a class-based component, they have a constructor which is where we're going to be setting our state.
class App extends Component{
  constructor(props){
    super(props);

    this.state = {
       videos: [],
       selectedVideo: null
     };

//This YTSearch object, will take care of retrieving our videos from youtube
//For key we assign the pre-declared API_KEY, the term is the keyword that the search will be based on, so it will return iphone videos.
  this.videoSearch('music')
}

videoSearch(term){
  YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      }); //translates to this.setState({videos : videos}). Because its the same name we can reduce it to one.
    });
}

//Every class-based component must have a render(), this will make sure that whatever is put inside will be compiled to show on the browser.
render(){

  const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

  return(
    //This is how we write the components into jsx which will be compiled.
    //We can write it with /> at the end because it not having to do something else other than show up.
      <div>
        <SearchBar onSearchTermChange={term => this.videoSearch(term)}/>

        <VideoPlayer video={this.state.selectedVideo}/>
        <VideoList
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos}/>
      </div>
        //Here we are passing each video we get from the search. Which we will assign to each instantiation of video_list_item
    );
  }
}
//Here we are using the ReactDOM to render the Root App Component, and the second argument is us telling ReactDOM to connect to the div
//.container which we wrote in the index.html file.
ReactDOM.render(<App />, document.querySelector('.container'));
