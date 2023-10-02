import React, { Component } from 'react';
import { /*Formik, Form,*/ Field, FieldArray } from 'formik';

//text
import TextField from '@mui/material/TextField';

import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';


class RangeTextInputField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
          <FieldArray
            name={this.props.name}
          >
            {({ insert, remove, push }) => (
              <div className="field">
                    <div className="row-solo" key={0}>
                      {this.props.item.fields.map((ch, inx) => (
                        <div key={"x"+inx} >
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
                        {inx === 0 &&
                           (<div className="col-x"><div className="bottomline">and</div></div>)
                         }
                        </div>
                      ))}
                    </div>
              </div>
            )}
          </FieldArray>
      )
    }
}

export default RangeTextInputField
