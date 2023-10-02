import React, { Component } from 'react';
import { Field, FieldArray } from 'formik';

import CheckboxGroupField from './fields/CheckboxGroupField';
import TextInputField from './fields/TextInputField';
import MultipleField from './fields/MultipleField';
import RadioGroupField from './fields/RadioGroupField';
import RangeTextInputField from './fields/RangeTextInputField';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

import {getCheckboxOrMultipleLimit, getLabelVisibility, getHelperVisibility} from './Constants';

import {_switchPart} from './Helper';

//import FieldHandler from './FieldHandler';

class FieldArrayHandler extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount(){

  }

/*
  _switchPart(parent, ch, field, meta, form){

    switch (ch.type) {
        case "checkbox":
        return (
          <CheckboxGroupField
            name={field.name}
            disabled={ch.disabled}
            item={ch}
            field={field}
            form={form}
            onHandle={this.props.onHandle}
          />
        )

      case "radio":
        return (
          <RadioGroupField
            name={field.name}
            field={field}
            item={ch}
            onHandle={this.props.onHandle}
          />
        );

    case "range_text":
        return (
              <RangeTextInputField
                name={field.name}
                item={ch}
                field={field}
                //form={form}
                onHandle={this.props.onHandle}
              />
        )

    case "multiple":
        return (
            <MultipleField
                 name={field.name}
                 field={field}
                 item={ch}
                 form={form}
                 onHandle={this.props.onHandle}
            />
        )

      default:
        return (
            <TextInputField
                 name={field.name}
                 item={ch}
                 field={field}
                 form={form}
                 meta={meta}
                 onHandle={this.props.onHandle}
            />
        )
      }
  }
*/

  render() {
    let parent = this.props.item;
    let values = this.props.values;

    //create skeleton unless given
    let emptySkeleton = {};
    if(!this.props.item?.emptySkeleton){
        for (var i = 0; i < parent.fields.length; i++) {
            if(parent.fields[i].type === "checkbox" || parent.fields[i].type ==="multiple" || parent.fields[i].type === "range_text"){
                emptySkeleton[parent.fields[i].name] = [];
            } else {
                emptySkeleton[parent.fields[i].name] = '';
            }
        }
    } else{
        emptySkeleton = this.props.item.emptySkeleton;
    }

    return (
          <FieldArray
            name={parent.name}
          >
            {({ insert, remove, push, form }) => (
              <div className="field field-array">

                {values[parent.name].length > 0 &&
                  values[parent.name].map((child, index) => (
                    <div className="row" key={index}>
                      
                      {parent.fields.map((ch, inx) => (
                        <div key={"x"+inx} className="col">
                         <Field                     
                          name={`${parent.name}.${index}.${ch.name}`}
                         >
                           {({
                             field, // { name, value, onChange, onBlur }
                             form,
                             meta,
                           }) => (
                             <div className={"field field-"+ch.type}>
                                {(getLabelVisibility(ch)) &&
                                  <FormLabel component="legend">
                                    {ch.label}
                                  </FormLabel>
                                }

                                {/*this._switchPart(parent, ch, field, meta, form)*/}
                                {_switchPart(ch, ch.type, field, meta, form, this.props.onHandle, this.props.onErrorHandle)}

                                {(getHelperVisibility(values, ch)) &&
                                  <FormHelperText
                                      error={meta.touched && (meta.error && meta.error.length > 0 ? true : false)}
                                  >
                                    {meta.error}

                                    {meta.touched && (meta.error && meta.error.length > 0 ? true : false) &&
                                        this.props.onErrorHandle(field, meta)
                                    }
                                  </FormHelperText>
                                }
                             </div>
                           )}
                         </Field>
                        </div>
                      ))}

                      <div className="col">
                        <IconButton
                            type="button"
                            title="Remove"
                            onClick={() => remove(index)}
                        >
                            <DeleteIcon />
                        </IconButton>
                      </div>

                    </div>
                  ))}

                <Button
                  variant="contained"
                  color="secondary"
                  type="button"
                  className="secondary"
                  onClick={() => push(emptySkeleton)}
                  disabled={(parent.maxArray && (values[parent.name].length >=parent.maxArray))? true: false}
                >
                  Add {parent.label}
                </Button>
                  <FormHelperText
                      error={(form.errors[parent.name] && form.errors[parent.name].length > 0 ? true : false)}
                  >
                    {typeof form.errors[parent.name] === "string" &&
                        <>{form.errors[parent.name]}</>
                    }
                  </FormHelperText>
                 {parent.maxArray &&
                  (
                    <h6>There is a limit of {parent.maxArray} {parent.label.toLowerCase()} in place.</h6>
                  )
                 }
              </div>
            )}
          </FieldArray>
    )
  }
}

export default FieldArrayHandler