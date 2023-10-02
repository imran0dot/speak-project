import React, { Component } from 'react';

//rating
import Rating from '@mui/material/Rating';
import { uuid } from '../../Utility/Utility';

class RatingField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
          <Rating
            name={this.props.name + uuid()}
            {...this.props.field}
            value={parseFloat(this.props.field.value)}
            onChange={
                (e, value) => {
                    this.props.form.setFieldValue(this.props.name, value);
                    this.props.onHandle(this.props.name, value);
                }
            }
            //name={input.name + "-" +uuid()}
            defaultValue={0}
            max={this.props.item.max}
            disabled={this.props.item.disabled}
            precision={0.5}
          />
      )
    }
}

export default RatingField
