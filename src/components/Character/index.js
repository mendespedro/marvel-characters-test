import React, { Component } from 'react';
import ImageLoader from '../ImageLoader';
import Loader from '../Loader';
import ApiHandler from '../../api/api-handler';
import './style.css';

const Empty_Description = 'Sorry, there is no description.';
const Empty_Comics = 'Sorry, there are no comics.';
const Loading_Comics = 'Searching for comics...';

class Character extends Component {
    constructor(props){
        super(props);
        this.apiHandler = new ApiHandler();
        this.state = {
            character: null,
            comics: null,
        }
    }

    componentDidUpdate(prevProps) {
        const { characterId } = this.props;
        if (characterId !== prevProps.characterId) {
            this.setState({
                character: null,
                comics: null,
            });
            this.renderCharacter(characterId);
        }
      }

    getCharacterImageURL(path, extension) {
        return `${path}/standard_fantastic.${extension}`;
    }

    renderCharacter(id){
        this.apiHandler.readCharacterById(id, character => 
          this.setState({character: character})
        );
        this.renderComics(id);
    }
    
    renderComics(id){
        this.apiHandler.listComics(id, comics => 
          this.setState({comics: comics})
        );
    }
    
    render() {
        const { character, comics } = this.state;

        return (
            character ?
            <div className="character">
                <div className="character__header">
                    <img 
                        alt="Character" 
                        className="character__img" 
                        src={this.getCharacterImageURL(character.thumbnail.path, character.thumbnail.extension)}
                    />
                    <div>
                        <h1>{character.name}</h1>
                        <ul className="character__links">
                        {character.urls.map((link, idx) => <li className="character_link" key={idx}><a href={link.url}>{link.type}</a></li>)}
                        </ul>
                    </div>
                </div>
                <h2>Description</h2>
                <p className="character__description">{character.description ? character.description : Empty_Description}</p>
                <h2>Comics</h2>
                {
                    character.comics.items.length > 0 ?
                    comics ?
                    <ul className="comics">
                        {comics.map((comic, idx) => <li key={idx} className="comics__container"><ImageLoader src={comic} alt="Comics"/></li>)}
                    </ul>
                    : <p>{Loading_Comics}</p>
                    : <p>{Empty_Comics}</p>
                }
            </div>
            : <Loader/>
        );
    }
}
    
export default Character;