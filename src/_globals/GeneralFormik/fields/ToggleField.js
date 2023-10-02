import React, { Component } from 'react';

//toggle
import Switch from '@mui/material/Switch';

class ToggleField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
          <Switch
            disabled={this.props.item.disabled}
            checked={this.props.field.value ? true : false}
            inputProps={{ 'aria-label': 'secondary checkbox' }, { 'role': 'switch' }}
            {...this.props.field}
            onChange={(e, value) => {
              this.props.form.setFieldValue(this.props.name, value)
              this.props.onHandle(this.props.name, value);
            }}
          />
      )
    }
}

export default ToggleField
