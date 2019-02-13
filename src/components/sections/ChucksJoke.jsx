import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

class ChucksJoke extends Component {
  render() {
    let props = this.props;
    return (
      <Fragment>
        <Typography variant="h6" color="textSecondary" align="center" paragraph>
          Your Chuck's joke
        </Typography>
        <Typography color="primary" align="center">
          <strong>{props.joke}</strong>
        </Typography>
      </Fragment>
    );
  }
}

export default ChucksJoke;