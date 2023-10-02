import React, { Component } from 'react';

//select
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

class SelectField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
           <Select
              fullWidth={true}
              disabled={this.props.item.disabled}
              aria-label={this.props.name}
              {...this.props.field}
              onChange={event => {
                this.props.form.setFieldValue(this.props.name, event.target.value);
                this.props.onHandle(this.props.name, event.target.value);
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                this.props.item.options.map((itm, j) => {
                  return (
                    <MenuItem
                      key={j}
                      value={itm.value}
                      disabled={itm.disabled}
                    >
                      {itm.label}
                    </MenuItem>
                  )
                })
              }
           </Select>
      )
    }
}

export default SelectField
