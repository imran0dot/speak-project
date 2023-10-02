import React, { Component } from 'react';
import { /*Formik, Form,*/ Field, FieldArray } from 'formik';

//popup checkbox/radio
import Popover from '@mui/material/Popover';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

//checkbox
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

class MultiplePopupCheckboxField extends Component {
    constructor(props, context) {
      super(props, context);
        this.state = {
          showToggle: false,
          open: false,
          anchorEl: null
        };
    }


  toggle = (event) => {
    //console.log("cli", this)
    //console.log("clicked on popper", event)
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget
    });
  };

  handleMultiplePops = (event, key) => {
    //console.log("cli", this)
    //console.log("clicked on multi-popper", event)
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget,
      active: key
    });
  };

  handleOpen = () => {
    //console.log("open")
    this.setState({ open: true });
  };

  handleClose = () => {
    //console.log("close")
    this.setState({ open: false });
  };

    render() {
      return (
            <>
              <Stack className="stacks" direction="row" spacing={1}>
                {this.props.item.fields.map((ch, inx) => (
                  <Chip key={inx} label={ch.label} data-testid="popup-checkbox" onClick={event => this.handleMultiplePops(event, inx)} />
                ))}
              </Stack>
              <FieldArray
                name={this.props.name}
              >
                {({ insert, remove, push }) => (
                  <div className="field field-array">
                        <div key={0}>
                          {this.props.item.fields.map((ch, inx) => (
                            <span key={"x"+inx}>
                                <div className="col-x">
                                 <Field
                                  name={`${this.props.name}.${ch.name}`}
                                 >
                                   {({
                                     field, // { name, value, onChange, onBlur }
                                     form,
                                     meta,
                                   }) => (
                                     <>
                                        <Popover
                                          open={this.state.open && (this.state.active === inx)}
                                          anchorEl={this.state.anchorEl}
                                          onMouseEnter={this.handleOpen}
                                          onMouseLeave={this.handleClose}
                                          anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'left',
                                          }}
                                        >
                                            <Paper>
                                              <ClickAwayListener onClickAway={this.handleClose}>
                                                  <FormGroup
                                                    disabled={ch.disabled}
                                                  >
                                                    {
                                                      ch.options.map((itm, j) => {
                                                        return (
                                                          <FormControl key={j} component="fieldset" disabled={ch.disabled}>
                                                            <FormControlLabel
                                                              name={ch.name}
                                                              label={itm.label}
                                                              checked={field.value? (field.value.includes(itm.value) ? true : false): false}
                                                              disabled={itm.disabled}
                                                              control={<Checkbox />}
                                                              onChange={(e, value) => {
                                                                  let currentVals = field.value.slice(0);

                                                                  if((field.value).includes(ch.options[j].value)){
                                                                      var index = currentVals.indexOf(ch.options[j].value.toString());
                                                                      if (index !== -1) {
                                                                        currentVals.splice(index, 1);
                                                                      }
                                                                  } else{
                                                                    currentVals.push(ch.options[j].value.toString())
                                                                  }
                                                                  form.setFieldValue(field.name, currentVals);
                                                                  this.props.onHandle(field.name, currentVals);
                                                                }
                                                              }
                                                            />
                                                          </FormControl>
                                                        )
                                                      })
                                                    }
                                                  </FormGroup>
                                              </ClickAwayListener>
                                          </Paper>
                                        </Popover>

                                        {meta.touched && meta.error && (
                                         <div className="error">{meta.error}</div>
                                        )}
                                     </>
                                   )}
                                 </Field>
                                </div>
                            </span>
                          ))}
                        </div>
                  </div>
                )}
              </FieldArray>
            </>
      )
    }
}

export default MultiplePopupCheckboxField
