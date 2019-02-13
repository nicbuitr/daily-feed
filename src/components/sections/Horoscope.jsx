import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';

class Horoscope extends Component {
  render() {
    let props = this.props;
    return (
      <Fragment>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Horoscope - {props.name}
        </Typography>
        <Typography color="textSecondary" paragraph>
          You're <strong>{props.horoscope.mood}</strong>.
          {" " + props.horoscope.description + " "}
          Your lucky number is <strong>{props.horoscope.lucky_number}.</strong>
        </Typography>
      </Fragment>
    );
  }
}

export default Horoscope;