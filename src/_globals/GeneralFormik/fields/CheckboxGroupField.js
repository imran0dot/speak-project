import React, { Component } from 'react';

//toggle
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

class CheckboxGroupField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
          <FormGroup
            row
            disabled={this.props.disabled}
          >
            {
              this.props.item.options.map((itm, j) => {
                return (
                  <FormControl key={j} component="fieldset" disabled={this.props.disabled}>
                    <FormControlLabel
                      name={this.props.name}
                      label={itm.label}
                      checked={this.props.field.value? (this.props.field.value.includes(itm.value) ? true : false): false}
                      //disabled={this.props.disabled}
                      disabled={itm.disabled}
                      control={<Checkbox />}
                      onChange={(e, value) => {
                          let currentVals = this.props.field.value.slice(0);

                          if((this.props.field.value).includes(this.props.item.options[j].value)){
                              var index = currentVals.indexOf(this.props.item.options[j].value.toString());
                              if (index !== -1) {
                                currentVals.splice(index, 1);
                              }
                          } else{
                            currentVals.push(this.props.item.options[j].value.toString())
                          }

                          this.props.form.setFieldValue(this.props.name, currentVals);
                          this.props.onHandle(this.props.name, currentVals);
                        }
                      }
                    />
                  </FormControl>
                )
              })
            }
          </FormGroup>
      )
    }
}

export default CheckboxGroupField
