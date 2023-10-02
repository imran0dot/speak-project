import React, { Component } from 'react';
import { Formik, Form } from 'formik';

import * as yup from 'yup';
import Button from '@mui/material/Button';

import './GeneralFormik.scss';

class ButtonMaker extends Component {

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount(){
  }

  render() {
    return (
         <div className="button-wrapper">
            {this.props.schema.buttons && this.props.schema.buttons.length > 0 &&
              (
                this.props.schema.buttons.map((item, j) => {

                  return (
                    <Button
                      key={j}
                      color={item.color}
                      variant={item.variant}
                      type={item.type}
                      onClick={item.type ==="previous"? this.props.previous : null}
                      //onClick={() => (item.type ==="previous"? this.props.previous: null)}
                      //onClick={() => item.type ==="reset"? formik.resetForm(): null}
                      disabled={false}
                    >
                      {item.label}
                    </Button>
                  )

                })
              )
            }
         </div>
    )
  }
}

export default ButtonMaker
