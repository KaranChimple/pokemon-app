import { combineReducers } from 'redux';
import pokemonListReducer from './pokemonListReducer';
import pokemonDetailsReducer from './pokemonDetailsReducer';
import comparePokemonReducer from './comparePokemonsReducer';

const rootReducer = combineReducers({
    pokemonList: pokemonListReducer,
    pokemonDetails: pokemonDetailsReducer,
    comparePokemons: comparePokemonReducer,
});

export default rootReducer;