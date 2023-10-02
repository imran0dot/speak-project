
/*
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

*/


import React, { Component } from 'react';
import { /*Formik, Form,*/ Field, FieldArray } from 'formik';

//select
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

//text
import TextField from '@mui/material/TextField';

import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

import { Donut } from 'react-dial-knob';


class ComboSelectKnobField extends Component {
    constructor(props, context) {
      super(props, context);
      this.state = {
        knobVal: 0
      };

      this._isMounted = false;
    }

    componentDidMount(){
      this._isMounted = true;
    }    

    componentWillUnmount() {
      this._isMounted = false;
      clearInterval(this.timer);
    }

    render() {
      let that = this;
    

      return (
          <FieldArray
            name={this.props.name}
          >
            {({ insert, remove, push }) => (
              <div className="field">
                    <div className="row-solo" key={0}>
                      {this.props.item.fields.map((ch, inx) => (
                        <div className="col-el-x" key={"x"+inx} >
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
                                      {inx === 0 ?
                                        (
                                        <Select
                                            fullWidth={true}
                                            disabled={this.props.item.disabled}
                                            aria-label={ch.name}
                                            {...field}
                                            onChange={event => {
                                              form.setFieldValue(field.name, event.target.value);
                                              this.props.onHandle(field.name, event.target.value);
                                            }}
                                          >
                                            <MenuItem value="">
                                              <em>None</em>
                                            </MenuItem>
                                            {
                                              ch.options.map((itm, j) => {
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
                                        ):
                                        (
                                          <>
                                            <div className="donut">
                                              <Donut
                                                  diameter={60}
                                                  min={0}
                                                  max={100}
                                                  step={1}
                                                  value={field.value}
                                                  theme={{
                                                      donutColor: "#ef7e60",
                                                      //bgrColor: "inherit",
                                                      //maxedBgrColor?: string
                                                      centerColor: "white",
                                                      //centerFocusedColor?: string
                                                      donutThickness: 5
                                                  }}
                                                  //onValueChange
                                                  onValueChange={val => {
                                                    //console.log("val", val);
                                                    //console.log("this._isMounted", this._isMounted)

                                                    if(this._isMounted){
                                                        //this.timer = setTimeout(() => {
                                                          form.setFieldValue(field.name, val);
                                                          that.props.onHandle(field.name, val);
                                                        //}, 1);
                                                    }
                                                  }}
                                                  ariaLabelledBy={'my-label'}
                                              >
                                                  <label className="donut-label" id={ch.label.replaceAll(' ', '-').toLowerCase()}>{ch.label}</label>
                                              </Donut>
                                            </div>

                                            {/*
                                            <TextField
                                              fullWidth={false}
                                              type={ch.type}
                                              label={ch.label}
                                              disabled={this.props.item.disabled}
                                              {...field}
                                              onChange={event => {
                                                form.setFieldValue(field.name, event.target.value);
                                                this.props.onHandle(field.name, event.target.value);
                                              }}
                                            />
                                            */}
                                          </>
                                        )
                                      }
                                        <FormHelperText
                                            error={meta.touched && (meta.error && meta.error.length > 0 ? true : false)}
                                        >
                                          {meta.error}

                                          {meta.touched && (meta.error && meta.error.length > 0 ? true : false) &&
                                              this.props.onErrorHandle(field, meta)
                                          }
                                        </FormHelperText>
                                   </>
                                 )}
                               </Field>
                          </div>

                        </div>
                      ))}
                    </div>
              </div>
            )}
          </FieldArray>
      )
    }
}

export default ComboSelectKnobField
