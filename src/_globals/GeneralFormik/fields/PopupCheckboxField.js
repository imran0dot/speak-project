import React, { Component } from 'react';

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

class PopupCheckboxField extends Component {
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
                    <Chip label={this.props.item.label} data-testid="popup-checkbox" onClick={this.toggle} />
                </Stack>
                <Popover
                  open={this.state.open}
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
                            disabled={this.props.item.disabled}
                          >
                            {
                              this.props.item.options.map((itm, j) => {
                                return (
                                  <FormControl key={j} component="fieldset" disabled={this.props.item.disabled}>
                                    <FormControlLabel
                                      name={this.props.name}
                                      label={itm.label}
                                      checked={this.props.field.value? (this.props.field.value.includes(itm.value) ? true : false): false}
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
                      </ClickAwayListener>
                  </Paper>
                </Popover>
            </>
      )
    }
}

export default PopupCheckboxField
