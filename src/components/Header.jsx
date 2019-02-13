import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  header: {
    backgroundColor: '#2196f3',
    position: 'absolute',
    '& > div': {
      justifyContent: 'center',
    }
  },
  title: {
    color: 'white',
    fontSize: '36px',
    fontWeight: 'bold'

  }
});

class Header extends Component {
  render() {
    let classes = this.props.classes;
    return (
      <AppBar color="default" className={classes.header}>
        <Toolbar>
          <Typography variant="h1" className={classes.title}>
            {__dirname.split('\\').reverse()[2].split('-').join(' ').toLocaleUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);