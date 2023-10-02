import React, { Component } from 'react';
import { /*Formik, Form,*/ Field, FieldArray } from 'formik';

//text
import TextField from '@mui/material/TextField';

//date
import moment from 'moment';
//import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
//import DateFnsUtils from "@date-io/date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

class RangeDateField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
          <FieldArray
            name={this.props.name}
            //onChange={event => {
            //    console.log("event field array change", event)
            //}}
          >
            {({ insert, remove, push }) => (
              <div className="field field-range_date">
                    <div className="row-solo" key={0}>
                      {this.props.item.fields.map((ch, inx) => (
                            <span key={"x"+inx}  className="col-x">
                                <div>
                                 <Field
                                  name={`${this.props.name}.${ch.name}`}
                                 >
                                   {({
                                     field, // { name, value, onChange, onBlur }
                                     form,
                                     meta,
                                   }) => (
                                     <>
                                        {
                                         //console.log("meta", meta)}
                                        }
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <DatePicker
                                            label={ch.label}
                                            disablePast={ch.disablePast}
                                            disableFuture={ch.disableFuture}
                                            minDate={moment(ch.minDate)}
                                            maxDate={moment(ch.maxDate)}
                                            value={field.value? moment(field.value).format('YYYY-MM-DD'): moment().format('YYYY-MM-DD')}
                                            {...field}
                                            onChange={(value) => {
                                              form.setFieldValue(field.name, value);
                                              this.props.onHandle(field.name, value);
                                            }}
                                            renderInput={(params) => {
                                                return (<TextField {...params} name={field.name} />)
                                            }}
                                          />
                                        </LocalizationProvider>

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
                            </span>

                      ))}
                    </div>
              </div>
            )}
          </FieldArray>
      )
    }
}

export default RangeDateField
