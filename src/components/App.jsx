import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { callAPI } from '../api/functions.js';
import Header from './Header';
import Horoscope from './sections/Horoscope.jsx';
import ChucksJoke from './sections/ChucksJoke.jsx';
import RandomJoke from './sections/RandomJoke.jsx';
import RnMCharacter from './sections/RnMCharacter.jsx';
import Footer from './Footer';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  block: {
    display: 'block',
  },
  mainContent: {
    background: '#eaeff1',
    padding: '75px 10px 5px',
  },
  row: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  },
  paper: {
    flex: '1',
    margin: '10px',
    overflow: 'hidden'
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  contentWrapper: {
    margin: '15px 16px',
  },
  cardWrapper: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center'
  },
  card: {
    boxShadow: 'none',
    paddingTop: "16px"
  },
  media: {
    backgroundSize: 'contain',
    height: 300,
  },
});

const signs = [
  "Aquarius",
  "Aries",
  "Cancer",
  "Capricorn",
  "Gemini",
  "Leo",
  "Libra",
  "Pisces",
  "Sagittarius",
  "Scorpio",
  "Taurus",
  "Virgo"
]

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sign: 'Aquarius',
      horoscopeA: {},
      horoscopeB: {},
      chucksJoke: '',
      randomJoke: {},
      randomActivity: {},
      conjunctAdvice: '',
      characterRNM: {}
    };
  }

  componentDidMount() {
    document.documentElement.lang = 'en';
    this.fetchInformation(this.state.sign);
  }

  fetchInformation(sign) {
    this.setState({ sign: sign });

    callAPI.getHoroscopes(sign.toLowerCase(), 'today').then(result => {
      // callAPI.getHoroscopes(resultA.compatibility.toLowerCase(), 'today').then(resultB => {
      //   this.setState({ horoscopeB: resultB });
      //   callAPI.getConjunctAdvice(parseInt(resultA.lucky_number) + parseInt(resultB.lucky_number)).then(respC => {
      //     this.setState({ conjunctAdvice: respC });
      //   });
      //   callAPI.getCharacterRNM(parseInt(resultA.lucky_number) - 1).then(respD => {
      //     this.setState({ characterRNM: respD });
      //   });
      // });
      // this.setState({ horoscopeA: result.horoscopeA });
      this.setState({
        horoscopeA: result.horoscopeA,
        horoscopeB: result.horoscopeB,
        conjunctAdvice: result.conjunctAdvice,
        characterRNM: result.characterRNM,
      });
    });

    callAPI.getChucksJoke().then(resp => {
      this.setState({ chucksJoke: resp });
    });

    callAPI.getRandomJoke().then(resp => {
      this.setState({ randomJoke: resp });
    });

    callAPI.getRandomActivity().then(resp => {
      this.setState({ randomActivity: resp });
    });
  }

  handleChange(event) {
    this.fetchInformation(event.target.value);
  };

  render() {
    const { classes } = this.props;
    let state = this.state;
    return (
      <Fragment>
        <CssBaseline />
        <Header />
        <main className={classes.mainContent}>
          {/* Horoscopes and Jokes Section - START */}
          <section className={classes.row}>
            {/* Horoscope A and Chuck's Joke - START */}
            <Paper className={classes.paper} tabIndex="0">
              <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                  <Grid container spacing={16} alignItems="center">
                    <Grid item>
                      <SearchIcon className={classes.block} color="inherit" />
                    </Grid>
                    <Grid item xs>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={state.sign}
                          onChange={this.handleChange.bind(this)}
                          name="sign"
                          className={classes.selectEmpty} >
                          {signs.map((sign) => (<MenuItem key={sign} value={sign}>{sign}</MenuItem>))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Toolbar>
              </AppBar>
              <div className={classes.contentWrapper}>
                {state.horoscopeA.mood ?
                  <Horoscope name={state.sign} horoscope={state.horoscopeA} />
                  :
                  <Typography gutterBottom variant="h6">Fetching Horoscope A...</Typography>
                }
                <hr />
                {state.chucksJoke ?
                  <ChucksJoke joke={state.chucksJoke} />
                  :
                  <Typography gutterBottom variant="h6">Fetching Chuck's Joke...</Typography>
                }
              </div>
            </Paper>
            {/* Horoscope A and Chuck's Joke - END */}
            {/* Horoscope B and Random Joke - START */}
            <Paper className={classes.paper} tabIndex="0">
              <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                  <Typography variant="subtitle1" color="textPrimary">
                    Today compatible with <strong>{state.horoscopeA.compatibility}</strong>
                  </Typography>
                </Toolbar>
              </AppBar>
              <div className={classes.contentWrapper}>
                {state.horoscopeB.mood ?
                  <Horoscope name={state.horoscopeA.compatibility} horoscope={state.horoscopeB} />
                  :
                  <Typography gutterBottom variant="h6">Fetching Horoscope B...</Typography>
                }
                <hr />
                {state.randomJoke.setup ?
                  <RandomJoke name={state.horoscopeA.compatibility} joke={state.randomJoke} />
                  :
                  state.randomJoke.message ?
                    <Typography gutterBottom variant="h6" color="secondary">
                      Your ip has exceeded the 100 request limit per 15 minute(s). Try again in in 15 minute(s)
                    </Typography>
                    :
                    <Typography gutterBottom variant="h6">Fetching Joke...</Typography>
                }
              </div>
            </Paper>
            {/* Horoscope B and Random Joke - END */}
          </section>
          {/* Horoscopes and Jokes Section - END */}
          {/* Activity, Advice and Rick&Morty Character Section - START */}
          <section className={classes.row}>
            {/* Activity and Random Advice - START */}
            <Paper className={classes.paper} tabIndex="0">
              <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                  <Typography variant="subtitle1" color="textPrimary">
                    <strong>You Could...</strong>
                  </Typography>
                </Toolbar>
              </AppBar>
              <div className={classes.contentWrapper}>
                {state.randomActivity.activity ?
                  <Typography variant="h6" color="textSecondary" paragraph>
                    {state.randomActivity.activity + " "}
                    and share some <strong>{state.randomActivity.type + " "}</strong>
                    activity together with <strong>{state.horoscopeA.compatibility}.</strong>
                  </Typography>
                  :
                  <Typography gutterBottom variant="h6">Fetching Activity...</Typography>
                }
                <hr />
                {state.conjunctAdvice ?
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    A piece of advice: "<i>{state.conjunctAdvice}"</i>
                  </Typography>
                  :
                  <Typography gutterBottom variant="h6">Fetching Advice...</Typography>
                }
              </div>
            </Paper>
            {/* Activity and Random Advice - END */}
            {/* Rick & Morty Character - START */}
            <Paper className={classes.paper} tabIndex="0">
              <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                  <Typography variant="subtitle1" color="textPrimary">
                    <strong>Today's Rick & Morty Char</strong>
                  </Typography>
                </Toolbar>
              </AppBar>
              <div className={classes.cardWrapper}>
                {state.characterRNM.image ?
                  <RnMCharacter character={state.characterRNM} />
                  :
                  state.characterRNM.message ?
                    <Typography gutterBottom variant="h6" color="secondary">
                      Your ip has exceeded the 10000 request limit per day. Try again tomorrow.
                  </Typography>
                    :
                    <Typography gutterBottom variant="h6">Fetching Character...</Typography>
                }
              </div>
            </Paper>
            {/* Rick & Morty Character - END */}
          </section>
          {/* Activity, Advice and Rick&Morty Character Section - END */}
        </main>
        <Footer />
      </Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);