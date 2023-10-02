import React, { Component } from 'react';

//text
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';


class TextInputField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
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
      )
    }
}

export default TextInputField
