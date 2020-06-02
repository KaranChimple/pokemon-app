import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getData, getPokemonDetails, comparePokemon } from '../actions/actions';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

class MainScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      navigation: 'Home',
      selectedPokemon1: {},
      selectedPokemon2: {},
      pokemonDetailsSelected: false,
      comparePokemonSelected: false,
      pokemonList: [],
    }
  }

  componentDidMount() {
    const { pokemonList } = this.state;
  }

  showPokemonDetails = () => {
    this.setState({
      pokemonDetailsSelected: true,
    })
  }

  comparePokemonDetails = () => {
    this.setState({
      comparePokemonSelected: true,
    })
  }

  render() {
    const { navigation, selectedPokemon1, selectedPokemon2, pokemonDetailsSelected, comparePokemonSelected } = this.state;
    return (
      <div className={styles.root}>
        <AppBar position="static">
          <Typography variant="h6" className={styles.title}>
            <p style={styles.menuText}>Header</p>
          </Typography>
        </AppBar>
        <div style={styles.body}>
          <h2>Gotta catch ‘em all</h2>
          <div style={styles.buttonContainer}>
            {!pokemonDetailsSelected && <Button variant="contained">View Pokémon Details</Button>}
            {pokemonDetailsSelected && <div>
              <span style={styles.centerAlignElements}>Select your Pokémon</span>
            </div>}
          </div>
          <div style={styles.buttonContainer}>
            {!comparePokemonSelected && <Button variant="contained">Compare Pokémon</Button>}
          </div>
        </div>
      </div>
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
  body: {
    textAlign: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  buttonContainer: {
    marginTop: 60,
  },
  centerAlignElements: {
    textAlign: 'center',
    justifyContent: 'space-between',
  }
};

const mapStateToProps = (state) => {
  return {
    pokemonList: state.pokemonList,
  }
}

export default connect(mapStateToProps, { getData, getPokemonDetails, comparePokemon })(MainScreen);
