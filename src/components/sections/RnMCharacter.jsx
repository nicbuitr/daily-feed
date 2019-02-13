import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
  card: {
    boxShadow: 'none',
    paddingTop: "16px"
  },
  media: {
    backgroundSize: 'contain',
    height: 300,
  },
});

class ChucksJoke extends Component {
  render() {
    const { classes } = this.props;
    let props = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={props.character.image}
          title={props.character.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" align="center">
            <strong>{props.character.name}</strong>
          </Typography>
          <Typography component="p">
            <strong>{props.character.name}</strong> is a
            <strong>{" " + props.character.gender}</strong>
            <strong>{" " + props.character.species}</strong> currently
            <strong>{" " + props.character.status}</strong>.<br />Native from
            <strong>{" " + props.character.origin.name}</strong> and currently located at
            <strong>{" " + props.character.location.name}</strong>.
      </Typography>
        </CardContent>
      </Card>
    );
  }
}

ChucksJoke.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChucksJoke);