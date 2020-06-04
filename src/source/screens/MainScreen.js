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

  componentDidUpdate(prevProps) {
    const { pokemonDetails } = this.props;
    if (JSON.stringify(pokemonDetails) !== JSON.stringify(prevProps.pokemonDetails)) {
      this.setState({
        selectedPokemon1: pokemonDetails,
      });
    }
  }

  togglePokemonDetails = () => {
    const { pokemonDetailsSelected } = this.state;
    this.setState({
      pokemonDetailsSelected: !pokemonDetailsSelected,
    })
    if (!pokemonDetailsSelected)
      navigation.push('View Pokémon Details')
    else
      navigation.pop();
  }

  toggleComparePokemonDetails = () => {
    const { comparePokemonSelected } = this.state;
    this.setState({
      comparePokemonSelected: !comparePokemonSelected,
    })
  }

  _loadNextPage = () => {
    const { getData, pokemonList } = this.props;
    if (!isEmpty(pokemonList.data.next))
      getData({ nextUrl: pokemonList.data.next });
  }

  _pokemonSelected = (item) => {
    const { getPokemonDetails } = this.props;
    if (!isEmpty(item)) {
      this.setState({
        selectedPokemon1: item,
      });
      getPokemonDetails(item.url);
    } else {
      this.setState({
        selectedPokemon1: null,
      }, () => {
        this.togglePokemonDetails();
      })
    }
  }

  render() {
    const {
      selectedPokemon1,
      selectedPokemon2,
      pokemonDetailsSelected,
      comparePokemonSelected
    } = this.state;
    const {
      pokemonList,
      pokemonDetails
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
              {!comparePokemonSelected && <Button variant="contained">Compare Pokémon</Button>}
            </div>
          </div>
        </div>
        {!isEmpty(selectedPokemon1) && !isEmpty(selectedPokemon1.data) && <div style={styles.tableContainer}>
          <CustomizedTables data={selectedPokemon1.data} />
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
  }
}

export default connect(mapStateToProps, { getData, getPokemonDetails, comparePokemon })(MainScreen);
