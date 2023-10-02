import React, { Component } from 'react';

//text
import TextField from '@mui/material/TextField';

class HiddenField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
          <TextField
             inputProps={{ 'data-testid': 'hidden' }}
             fullWidth={true}
             type={this.props.type}
             disabled={this.props.disabled}
             {...this.props.field}
          />
      )
    }
}

export default HiddenField
