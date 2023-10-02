import React, { Component } from 'react';

//text
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import HeatmapCalendarChart from '../.../../../Charts/HeatmapCalendarChart1/HeatmapCalendarChart1';
//date
import moment from 'moment';

import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

class HeatmapCalendarField extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        currentTime: new Date(),
        pickedDate: ""
      };

      this.onPrev = this.onPrev.bind(this);
      this.onNext = this.onNext.bind(this);

      this.onPickedDate = this.onPickedDate.bind(this);
    }

    componentDidMount(){
      let that = this;
    }

    onPrev(){
      console.log("prev");
      var prevMonth = moment(this.state.currentTime).subtract(1, 'M');

      this.setState({ 
        currentTime: prevMonth
      })

    }

    onNext(){
      console.log("next");
      var futureMonth = moment(this.state.currentTime).add(1, 'M');

      this.setState({ 
        currentTime: futureMonth
      })    
    }

    onPickedDate(data){
      console.log("onPickedDate", data);
      this.setState({ 
        pickedDate: data
      }) 

      //form.setFieldValue(field.name, value);
      //this.props.onHandle(field.name, value);
      

    }

    render() {


      /*
      var scheduleData = [{
          "date": "2023-06-21",
          "value": "4"
        },{
          "date": "2023-07-01",
          "value": "1"
        },{
          "date": "2023-07-10",
          "value": "211"
        },{
          "date": "2023-07-20",
          "value": "2"
        },
        {
          "date": "2023-07-21",
          "value": "5"
        },
        {
          "date": "2023-07-22",
          "value": "5"
        },
        {
          "date": "2023-07-23",
          "value": "0"
        },
        {
          "date": "2023-07-24",
          "value": "8"
        },
        {
          "date": "2023-07-25",
          "value": "3"
        },
        {
          "date": "2023-07-26",
          "value": "1"
        }
      ]
      */


      return (
            <>


              <div className="heatmap_calendar_header">
                <IconButton aria-label="previous" onClick={()=>this.onPrev()}>
                  <ChevronLeftIcon />
                </IconButton>
                <h2>{moment(this.state.currentTime).format('MMM YYYY')}</h2>
                <IconButton aria-label="next" onClick={()=>this.onNext()}>
                  <ChevronRightIcon />
                </IconButton>
              </div>

              {/*
              <button type="button" onClick={()=>this.onPrev()}>prev</button>
              <h2>{moment(this.state.currentTime).format('MMM YYYY')}</h2>
              <button type="button" onClick={()=>this.onNext()}>next</button>
              */}

              <HeatmapCalendarChart 
                data={this.props.item.options} 
                currentTime={moment(this.state.currentTime).format('MM-DD-YYYY')}
                width="300"
                height="300"
                theme={['#f7b363', '#448875', '#c12f39', '#2b2d39', '#f8dd2f']}
                selectedDate={this.props.field.value}
                pickedDate={value => {
                  this.props.form.setFieldValue(this.props.field.name, value);
                  this.props.onHandle(this.props.field.name, value);
                }}                
              />

              <h3>Picked date: {this.props.field.value && moment(this.props.field.value).format('DD MMM YYYY')}</h3>

              {/*
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
              */}
            </>
      )
    }
}

export default HeatmapCalendarField
