import {
  GET_POKEMON_DETAILS_LOADING,
  GET_POKEMON_DETAILS_SUCCESS,
  GET_POKEMON_DETAILS_FAILED,
} from '../actions/actionTypes';
import initialState from './initialState';

export default function pokemonListReducer(state = initialState.pokemonDetails, action) {
  switch (action.type) {
    case GET_POKEMON_DETAILS_LOADING:
      return { ...state, isLoading: true };
    case GET_POKEMON_DETAILS_SUCCESS:
      return { ...state, isLoading: false, data: action.payload };
    case GET_POKEMON_DETAILS_FAILED:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
}