import React, { Component } from 'react';
import ApiHandler from './api/api-handler';
import Character from './components/Character';
import Carousel from './components/Carousel';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.apiHandler = new ApiHandler();
    this.state = {
      characterId: null,
    }
    this.onCharacterClick = this.onCharacterClick.bind(this);
  }
  
  componentDidMount(){
    this.apiHandler.readRandomCharacter(characterId => 
      this.setState({characterId: characterId})
    );
  }

  onCharacterClick(id){
    this.setState({
      characterId: id,
    });
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="header">
          <a href='#' className="header__logo"></a>
        </header>
        <main>
          <Character characterId={this.state.characterId}/>
          <Carousel onCharacterClick={this.onCharacterClick} title="Characters"/>
          <Carousel onCharacterClick={this.onCharacterClick} nameStartsWith="b" />
          <Carousel onCharacterClick={this.onCharacterClick} nameStartsWith="c" />
          <Carousel onCharacterClick={this.onCharacterClick} nameStartsWith="d" />
          <Carousel onCharacterClick={this.onCharacterClick} nameStartsWith="e" />
        </main>
      </div>
      );
    }
  }
  
export default App;