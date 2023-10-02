import React, { Component } from 'react';

//file
import FileCopyIcon from '@mui/icons-material/FileCopy';

//text
import TextField from '@mui/material/TextField';

class FileField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {

        let inputProps = {};

        inputProps["data-testid"] = "upInput";

        if(this.props.item.multiple){
          inputProps["multiple"] = this.props.item.multiple;
        }
        if(this.props.item.accept){
          inputProps["accept"] = this.props.item.accept;
        }

        let prevImg = (this.props.field.value && this.props.field.value.length > 0 && typeof this.props.field.value === "string")? this.props.field.value: null;

        let showPrevImg = false;
        if(prevImg && prevImg.length > 0){
          showPrevImg = true;
        }

        if(prevImg && prevImg.includes("fakepath")){
          showPrevImg = false;
        }

        //console.log("this.props.field.value", this.props.field.value)

        delete this.props.field.value

      return (
          <>
              <TextField
                inputProps={inputProps}
                InputLabelProps={{shrink: true}}
                type={this.props.item.type}
                name={this.props.name}
                label={this.props.item.label}
                //error={this.props.touched && this.props.error}
                //helperText={this.props.touched && this.props.helperText}
                disabled={this.props.item.disabled}
                {...this.props.field}
                value={this.props.field.value}
                onChange={(e) => this.props.form.setFieldValue(this.props.name, e.target.files)}
              />
              <div className="previewIcon">
                {showPrevImg && (prevImg && prevImg.length > 0) ?
                  (
                    <img src={prevImg} alt="preview" />
                  ):
                  (
                    <FileCopyIcon />
                  )
                }
              </div>
          </>
      )
    }
}

export default FileField
