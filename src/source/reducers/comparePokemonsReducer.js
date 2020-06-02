import {
  COMPARE_POKEMON_LOADING,
  COMPARE_POKEMON_SUCCESS,
  COMPARE_POKEMON_FAILED,
} from '../actions/actionTypes';
import initialState from './initialState';

export default function comparePokemonReducer(state = initialState.pokemonDetails, action) {
  switch (action.type) {
    case COMPARE_POKEMON_LOADING:
      return { ...state, isLoading: true };
    case COMPARE_POKEMON_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case COMPARE_POKEMON_FAILED:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
}