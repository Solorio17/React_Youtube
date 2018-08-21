import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
const API_KEY = 'AIzaSyAheBEVRk7ORS6TUKu3FEAuuOzprJh7hnY';

class App extends Component{
  constructor(props){
    super(props);

    this.state = { videos: []};

    YTSearch({key: API_KEY, term: 'iphone'}, (videos) => {
      this.setState({ videos });
      console.log(data);
    });
}

render(){
  return(
      <div>
        <SearchBar />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
