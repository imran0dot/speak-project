import React, { Component } from 'react';

//text
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';



import PolygonManChart from '../.../../../Charts/PolygonManChart1/PolygonManChart1';

class PolygonManField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      //this.props.field.read_only

      return (
          <PolygonManChart 
            data={this.props.field.value} 
            width="300"
            height="250"
            r="100"
            ir="0"
            theme={['#046395', '#d62828', '#f77f00', '#fcbf49', '#eae2b7']}
            readOnly={false}
            pickedSegments={event => {
              console.log("data", event) 
              this.props.form.setFieldValue(this.props.name, event);
              this.props.onHandle(this.props.name, event);
            }}       
          />
      )
    }
}

export default PolygonManField
