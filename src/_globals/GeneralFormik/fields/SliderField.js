import React, { Component } from 'react';

//slider
import Slider from '@mui/material/Slider';

class SliderField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
          <Slider
              name={this.props.name}
              disabled={this.props.item.disabled}
              defaultValue={0}
              min={this.props.item.min}
              max={this.props.item.max}
              data-testid="slider"
              aria-labelledby={this.props.item.range? "range-slider": "continuous-slider"}
              valueLabelDisplay="auto"
              {...this.props.field}
              value={typeof this.props.field.value !== "number" && typeof this.props.field.value !== "object" ? 0: this.props.field.value}
              onChange={(e, value) => {
                this.props.form.setFieldValue(this.props.item.name, value)
                this.props.onHandle(this.props.name, value);
              }}
          />
      )
    }
}

export default SliderField
