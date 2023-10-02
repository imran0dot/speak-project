/*import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

class GroupedButtons extends React.Component {
  state = { counter: 0 };

  handleIncrement = () => {
    this.setState((state) => ({ counter: state.counter + 1 }));
  };

  handleDecrement = () => {
    this.setState((state) => ({ counter: state.counter - 1 }));
  };
  render() {
    //const displayCounter = this.state.counter > 0;

    return (
      <ButtonGroup size="small" aria-label="small outlined button group">
        <Button onClick={this.handleDecrement}>-</Button>
        <Button disabled>{this.state.counter}</Button>
        <Button onClick={this.handleIncrement}>+</Button>
      </ButtonGroup>
    );
  }
}

export default GroupedButtons;*/



import React, { Component } from 'react';

//text
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

class DecIncInputField extends Component {
    constructor(props, context) {
      super(props, context);

      this.handleDecrement = this.handleDecrement.bind(this);
      this.handleIncrement = this.handleIncrement.bind(this);
    }

    handleIncrement(event) {
      console.log("handleIncrement")
      //this.setState((state) => ({ counter: state.counter + 1 }));

      this.props.form.setFieldValue(this.props.name, this.props.field.value +1);
      this.props.onHandle(this.props.name, this.props.field.value +1);      
    }

    handleDecrement(event) {
      console.log("handleDecrement")
      //this.setState((state) => ({ counter: state.counter - 1 }));
    
      this.props.form.setFieldValue(this.props.name, this.props.field.value - 1);
      this.props.onHandle(this.props.name, this.props.field.value - 1);
    }


    render() {
      return (
         <ButtonGroup>
            <Button onClick={this.handleDecrement} disabled={this.props.item.disabled}>-</Button>
            <Button disabled>{this.props.field.value}{this.props.item.units}</Button>
            <Button onClick={this.handleIncrement} disabled={this.props.item.disabled}>+</Button>
        </ButtonGroup>
      )
    }
}

export default DecIncInputField


            /*
            <TextField
              fullWidth={true}
              type={this.props.item.type}
              label={this.props.item.label}
              placeholder={this.props.item.placeholder}
              InputLabelProps={this.props.item.placeholder? {shrink: true} : {}}
              InputProps={{
                startAdornment: this.props.item.startAdornment? <InputAdornment position="start">{this.props.item.startAdornment}</InputAdornment>: null,
                endAdornment: this.props.item.endAdornment? <InputAdornment position="end">{this.props.item.endAdornment}</InputAdornment>: null
              }}
              inputProps={{
                maxLength: this.props.item.charLimit? this.props.item.charLimit:null,
                autoComplete: this.props.item.autoComplete? this.props.item.autoComplete:"off"
              }}
              rows={(this.props.item.type === "comment") ? 6 : null}
              multiline={(this.props.item.type === "comment") ? true : false}
              disabled={this.props.item.disabled}
              {...this.props.field}
              onChange={event => {
                this.props.form.setFieldValue(this.props.name, event.target.value);
                this.props.onHandle(this.props.name, event.target.value);
              }}
              error={this.props.meta.touched && (this.props.meta.error && this.props.meta.error.length > 0 ? true : false)}
            />
            */