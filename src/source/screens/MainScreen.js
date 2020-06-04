import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { getData, getPokemonDetails, comparePokemon } from '../actions/actions';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import InfiniteAutocomplete from './InfiniteAutocomplete';
import CustomizedTables from './customTableForSinglePokemon';

const navigation = ['Home'];

class MainScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      selectedPokemon1: {},
      selectedPokemon2: {},
      pokemonDetailsSelected: false,
      comparePokemonSelected: false,
    }
  }

  componentDidMount() {
    const { getData } = this.props;
    getData({ nextUrl: null });
  }

  togglePokemonDetails = () => {
    const { pokemonDetailsSelected, comparePokemonSelected } = this.state;
    this.setState({
      pokemonDetailsSelected: !pokemonDetailsSelected,
    });
    if (comparePokemonSelected) {
      this.setState({
        comparePokemon: false,
      })
    }
    if (!pokemonDetailsSelected)
      navigation.push('View Pokémon Details')
    else
      navigation.pop();
  }

  toggleComparePokemonDetails = () => {
    const { comparePokemonSelected } = this.state;
    this.setState({
      pokemonDetailsSelected: true,
      comparePokemonSelected: true,
    })
    if (!comparePokemonSelected)
      navigation.push('Compare Pokémon')
    else
      navigation.pop();
  }

  _loadNextPage = () => {
    const { getData, pokemonList } = this.props;
    if (!isEmpty(pokemonList.data.next))
      getData({ nextUrl: pokemonList.data.next });
  }

  _pokemonSelected = (item) => {
    const { getPokemonDetails } = this.props;
    const { selectedPokemon2 } = this.props;
    const { comparePokemonSelected } = this.state;
    if (!isEmpty(item)) {
      this.setState({
        selectedPokemon1: item,
      });
      getPokemonDetails(item.url);
    } else {
      this.setState({
        selectedPokemon1: null,
      }, () => {
        getPokemonDetails(null);
        this.togglePokemonDetails();
        if (isEmpty(selectedPokemon2) && comparePokemonSelected) {
          this.setState({
            comparePokemonSelected: false,
          });
        }
      });
    }
  }

  _pokemonToBeCompared = (item) => {
    const { comparePokemon } = this.props;
    const { selectedPokemon1 } = this.state;
    if (!isEmpty(item)) {
      this.setState({
        selectedPokemon2: item,
      });
      if (!isEmpty(selectedPokemon1))
        comparePokemon({ pokemon2: item })
    } else {
      this.setState({
        selectedPokemon2: null,
        comparePokemonSelected: false,
      }, () => {
        comparePokemon({ pokemon2: {} })
      });
      navigation.pop();
    }
  }

  render() {
    const {
      pokemonDetailsSelected,
      comparePokemonSelected
    } = this.state;
    const {
      pokemonList,
      pokemonDetails,
      pokemon2Data,
    } = this.props;
    return (
      <div className={styles.root}>
        <AppBar position="static">
          <Typography variant="h6">
            <p style={styles.menuText}>Header</p>
          </Typography>
        </AppBar>
        <span style={styles.navigationText}>{navigation.join(' > ')}</span>
        <div style={styles.body}>
          <h2>Gotta catch ‘em all</h2>
          <div style={!pokemonDetailsSelected ? styles.centerAlignButtonDivsVertically : { ...styles.body, ...styles.centerAlignButtonDivs }}>
            <div style={styles.pokemonDetailsContainer}>
              {!pokemonDetailsSelected && <Button variant="contained" onClick={this.togglePokemonDetails}>View Pokémon Details</Button>}
              {pokemonDetailsSelected && !isEmpty(pokemonList.data.results) && <div style={styles.rowAlignedDiv}>
                <InfiniteAutocomplete
                  hasNextPage={!isEmpty(pokemonList.data.next)}
                  isNextPageLoading={pokemonList.data.isLoading}
                  items={pokemonList.data.results}
                  onDataSelected={this._pokemonSelected}
                  loadNextPage={this._loadNextPage}
                />
              </div>}
            </div>
            <div style={styles.buttonContainer}>
              {!comparePokemonSelected && <Button variant="contained" onClick={this.toggleComparePokemonDetails}>Compare Pokémon</Button>}
              {comparePokemonSelected && !isEmpty(pokemonList.data.results) && <div style={styles.rowAlignedDiv}>
                <InfiniteAutocomplete
                  hasNextPage={!isEmpty(pokemonList.data.next)}
                  isNextPageLoading={pokemonList.data.isLoading}
                  items={pokemonList.data.results}
                  onDataSelected={this._pokemonToBeCompared}
                  loadNextPage={this._loadNextPage}
                />
              </div>}
            </div>
          </div>
        </div>
        {!isEmpty(pokemonDetails) && !isEmpty(pokemonDetails.data) && !comparePokemonSelected && pokemonDetailsSelected && <div style={styles.tableContainer}>
          <CustomizedTables data={pokemonDetails.data} />
        </div>}
        {!isEmpty(pokemonDetails) && !isEmpty(pokemonDetails.data) && !isEmpty(pokemon2Data) && !isEmpty(pokemon2Data.data) && comparePokemonSelected && <div style={styles.tableContainer}>
          <CustomizedTables data={pokemonDetails.data} data2={pokemon2Data.data} isComparisionTable />
        </div>}
      </div >
    )
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
  menuText: {
    paddingLeft: 20,
  },
  title: {
    flexGrow: 1,
    marginLeft: 2,
  },
  navigationText: {
    marginTop: 40,
    marginLeft: 20,
  },
  centerAlignButtonDivs: {
    display: 'flex'
  },
  body: {
    textAlign: 'center',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  rowAlignedDiv: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  centerAlignButtonDivsVertically: {
    display: 'inline-block',
    verticalAlign: 'top',
    lineHeight: 1,
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginTop: 60,
  },
  pokemonDetailsContainer: {
    marginTop: 60,
  },
  centerAlignElements: {
    textAlign: 'center',
    justifyContent: 'space-between',
  },
  tableContainer: {
    marginTop: 20,
  }
};

const mapStateToProps = (state) => {
  return {
    pokemonList: state.pokemonList,
    pokemonDetails: state.pokemonDetails,
    pokemon2Data: state.comparePokemons,
  }
}

export default connect(mapStateToProps, { getData, getPokemonDetails, comparePokemon })(MainScreen);
