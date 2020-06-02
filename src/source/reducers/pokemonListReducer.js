import {
  GET_DATA_LOADING,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
} from '../actions/actionTypes';
import initialState from './initialState';

export default function pokemonListReducer(state = initialState.pokemonList, action) {
  switch (action.type) {
    case GET_DATA_LOADING:
      return { ...state, isLoading: true };
    case GET_DATA_SUCCESS:
      return { ...state, isLoading: false, data: [...state.data, ...action.payload] };
    case GET_DATA_FAILED:
      return { ...state, error: action.error, isLoading: false };
    default:
      return state;
  }
}