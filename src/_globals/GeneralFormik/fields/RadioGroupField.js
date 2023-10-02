import React, { Component } from 'react';

//radio
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

class RadioGroupField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
          <RadioGroup
            row
            name={this.props.name}
            //disabled={item.disabled}
            {...this.props.field}
          >
            {
              this.props.item.options.map((itm, j) => {
                return (
                  <FormControlLabel key={j}
                    value={itm.value}
                    disabled={itm.disabled}
                    control={<Radio />}
                    label={itm.label}
                    onChange={(e, value) => {
                        //form.setFieldValue(item.name, value)
                        this.props.onHandle(this.props.name, itm.value);
                    }}
                  />
                )
              })
            }
          </RadioGroup>
      )
    }
}

export default RadioGroupField
