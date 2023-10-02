import React, { Component } from 'react';

//text
import TextField from '@mui/material/TextField';

//multiple
import Autocomplete from "@mui/material/Autocomplete";

class MultipleField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
        <Autocomplete
            multiple
            name={this.props.name}
            data-testid="autocomplete"
            //disabled={item.disabled}
            size="small"
            getOptionLabel={(option) => option.label}
            options={this.props.item.options}
            {...this.props.field}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            onChange={(e, value) => {
              this.props.form.setFieldValue(this.props.name, value);
              this.props.onHandle(this.props.name, value);
            }}
            renderInput={(params) => (<TextField {...params} variant="standard" label="Multiple values" />)}
        />
      )
    }
}

export default MultipleField
