import React, { Component } from 'react';

//popup checkbox/radio
import Popover from '@mui/material/Popover';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

//radio
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

class PopupRadioField extends Component {
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
                    <Chip label={this.props.item.label} data-testid="popup-radio" onClick={this.toggle} />
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
                          <RadioGroup
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
                      </ClickAwayListener>
                  </Paper>
                </Popover>
            </>
      )
    }
}

export default PopupRadioField
