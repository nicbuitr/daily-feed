import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

class RandomJoke extends Component {
  render() {
    let props = this.props;
    return (
      <Fragment>
        <Typography variant="h6" color="textSecondary" align="center" paragraph>
          Joke for {props.name}
        </Typography>
        <Typography color="primary" align="center">
          {props.joke.setup}
        </Typography>
        <Typography color="textSecondary" align="center">
          <strong>.<br /></strong>
          <strong>.<br /></strong>
          <strong>.<br /></strong>
        </Typography>
        <Typography color="secondary" align="center" paragraph>
          <strong>{props.joke.punchline}</strong>
        </Typography>
      </Fragment>
    );
  }
}

export default RandomJoke;