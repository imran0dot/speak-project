import React, { Component } from 'react';

//text
import TextField from '@mui/material/TextField';

//date
import moment from 'moment';
//import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
//import DateFnsUtils from "@date-io/date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

class DateField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={this.props.item.label}
            disablePast={this.props.item.disablePast}
            disableFuture={this.props.item.disableFuture}
            minDate={moment(this.props.item.minDate)}
            maxDate={moment(this.props.item.maxDate)}
            formatDate={(date) => moment(date).format('YYYY-MM-DD').toString()}
            value={this.props.field.value? moment(this.props.field.value).format('YYYY-MM-DD'): moment().format('YYYY-MM-DD')}
            {...this.props.field}
            onChange={(value) => {
              this.props.form.setFieldValue(this.props.name, value);
              this.props.onHandle(this.props.name, value);
            }}
            renderInput={(params) => {
                return (<TextField {...params} name={this.props.name} />)
            }}
          />
        </LocalizationProvider>
      )
    }
}

export default DateField
