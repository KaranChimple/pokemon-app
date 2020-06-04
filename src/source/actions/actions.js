import {
    GET_DATA_LOADING,
    GET_DATA_SUCCESS,
    GET_DATA_FAILED,
    COMPARE_POKEMON_LOADING,
    COMPARE_POKEMON_SUCCESS,
    COMPARE_POKEMON_FAILED,
    GET_POKEMON_DETAILS_LOADING,
    GET_POKEMON_DETAILS_SUCCESS,
    GET_POKEMON_DETAILS_FAILED,
} from './actionTypes';
import { baseUrl } from '../constants';
import axios from 'axios';
import { isEmpty } from 'lodash';

const getDataLoading = () => {
    return {
        type: GET_DATA_LOADING,
    };
};

const getDataSuccess = data => {
    return {
        type: GET_DATA_SUCCESS,
        payload: data,
    };
};

const getDataFailed = error => {
    return {
        type: GET_DATA_FAILED,
        error,
    };
};

const comparePokemonLoading = () => {
    return {
        type: COMPARE_POKEMON_LOADING,
    };
}

const comparePokemonSuccess = ({ pokeData1, pokeData2 }) => {
    return {
        type: COMPARE_POKEMON_SUCCESS,
        payload: {
            pokeData1,
            pokeData2
        },
    };
};

const comparePokemonFailed = error => {
    return {
        type: COMPARE_POKEMON_FAILED,
        error,
    };
};

const getPokemonDetailsLoading = () => {
    return {
        type: GET_POKEMON_DETAILS_LOADING,
    };
};

const getPokemonDetailsSuccess = data => {
    return {
        type: GET_POKEMON_DETAILS_SUCCESS,
        payload: data,
    };
};

const getPokemonDetailsFailed = error => {
    return {
        type: GET_POKEMON_DETAILS_FAILED,
        error,
    }
}

export const getData = ({ nextUrl = null }) => async dispatch => {
    dispatch(getDataLoading());
    try {
        const urlToBeSent = isEmpty(nextUrl) ? baseUrl : nextUrl;
        const resp = await axios.get(urlToBeSent);
        dispatch(getDataSuccess(resp.data))
    } catch (error) {
        dispatch(getDataFailed(error));
    }
}

export const comparePokemon = ({ pokemon1 = null, pokemon2 = null }) => async dispatch => {
    dispatch(comparePokemonLoading());
    try {
        if (!isEmpty(pokemon1) && !isEmpty(pokemon2)) {
            const resp1 = await axios.get(pokemon1.url);
            const resp2 = await axios.get(pokemon2.url);
            dispatch(comparePokemonSuccess({
                pokeData1: resp1.data,
                pokeData2: resp2.data
            }));
        }
    } catch (error) {
        dispatch(comparePokemonFailed(error));
    }
}

export const getPokemonDetails = (url) => async dispatch => {
    dispatch(getPokemonDetailsLoading());
    try {
        const resp = await axios.get(url);
        dispatch(getPokemonDetailsSuccess(resp.data));
    } catch (error) {
        dispatch(getPokemonDetailsFailed(error));
    }
}