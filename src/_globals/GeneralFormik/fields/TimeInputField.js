import React, { Component } from 'react';

//text
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';


import dayjs, { Dayjs } from 'dayjs';
//import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

//date
import moment from 'moment';

class TimeInputField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
            <>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker 
                  value={dayjs(moment().format('YYYY-MM-DD')+'T'+this.props.field.value)}
                  onChange={(value) => {
                    this.props.form.setFieldValue(this.props.name, moment(value.$d).format('HH:mm:ss'));
                    this.props.onHandle(this.props.name, moment(value.$d).format('HH:mm:ss'));
                  }}
                  renderInput={(params) => {
                    return (<TextField {...params} name={this.props.name} />)
                  }}
                />
              </LocalizationProvider>
            </>
      )
    }
}

export default TimeInputField
