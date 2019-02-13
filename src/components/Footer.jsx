import React, { Component, Fragment } from 'react';
import fs from 'fs';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    padding: theme.spacing.unit * 3,
  },
});

class Footer extends Component {
  render() {
    let copy = fs.readFileSync('./src/api/copyright.txt', 'utf8');
    let classes = this.props.classes;
    return (
      <Fragment>
        <footer className={classes.footer} tabIndex="0">
          <Typography variant="h6" align="center" gutterBottom>
            Daily Feed Web App
          </Typography>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            &copy; {new Date().getFullYear()} {copy}
          </Typography>
        </footer>
      </Fragment>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Footer);