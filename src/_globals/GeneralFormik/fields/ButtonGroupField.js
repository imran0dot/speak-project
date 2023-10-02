import React, { Component } from 'react';

//buttons
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

class ButtonGroupField extends Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      return (
          <ButtonGroup
            name={this.props.name}
            disabled={this.props.item.disabled}
            aria-label="outlined primary button group"
            variant="outlined"
            color="primary"
            {...this.props.field}
          >
            {
              this.props.item.options.map((itm, j) => {
                return(
                  <Button key={j}
                    variant={"outlined"}
                    color={"secondary"}
                    className={"button " + (this.props.field.value === itm.value? "selected": "")}
                    onClick={() => {
                        this.props.form.setFieldValue(this.props.name, itm.value)
                        this.props.onHandle(this.props.name, itm.value);
                    }}
                    disabled={itm.disabled}
                  >
                    {itm.label}
                  </Button>
                )
              })
            }
          </ButtonGroup>
      )
    }
}

export default ButtonGroupField
