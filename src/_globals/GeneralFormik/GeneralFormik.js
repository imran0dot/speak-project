import React, { Component } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';

import { debounce } from 'throttle-debounce';
import * as yup from 'yup';

import FieldMaker from './FieldMaker';
import ButtonMaker from './ButtonMaker';


import {jsonToFormData} from './Helper';
import {getCheckboxOrMultipleLimit} from './Constants';

import './GeneralFormik.scss';

class GeneralFormik extends Component {

    constructor(props, context) {
        super(props, context);
        this.visitFormRef = React.createRef();
        this.onErrorHandle = this.onErrorHandle.bind(this);
        this.fieldChanged = this.fieldChanged.bind(this);
        this.submitMyForm = this.submitMyForm.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    componentDidMount(){
    }

    onErrorHandle(field, meta){
       if(this.props.onErrorHandle){
           this.props.onErrorHandle({"field_name": field, "meta": meta});
       }
    }

    fieldChanged(field, value){
        if(this.props.fieldChanged){
            this.props.fieldChanged({"field_name": field, "value": value});
        }

        //if it does not have any submit buttons -- then submit the form on a change of fields
        if(!this.props.schema.buttons.length > 0 && !this.props.submitOnEnter){
          //console.log("no buttons and not submit on enter");
          
          setTimeout(() => {
              if(this.visitFormRef.current){
                this.visitFormRef.current.handleSubmit();
              }
          }, 1);          
        }
    }

    submitMyForm(values) {

      if(this.props.returnAsFormData){
        values = jsonToFormData(values);
      }

      //console.log("--->submitting data-", values);
      this.props.submitHandler(values);

      //check if there is a need to reset the form on submit - useful for chat box
      //reset
    }

    onKeyDown(event){
       if(event && parseInt(event.which, 10) === 13 && this.props.submitOnEnter) {
         event.preventDefault();
          if(this.visitFormRef.current){
            this.visitFormRef.current.handleSubmit();
            setTimeout(() => {
              if (this.props.resetFormOnSubmit) {
                this.visitFormRef.current.resetForm();
              }
            }, 1);          
          }
       }
    }

  render() {

    const createYupSchema = (fields) => {
      const schema = fields.reduce((schema, field) => {
          return field.validation 
          ? {...schema, [field.name]: field.validation} 
          : schema
      }, {})

      return yup.object().shape(schema)
    }

    const getInitialValues = (initialValues, fields) => {
        //override initial values if its a checkboxormultiple field
        let newInitialValues = {...initialValues}

        fields.map(function(item) {
          if(item['type'] === "checkboxormultiple") {
            //console.log("FOUND field - ", item['name'])
            //console.log("OPTION LENGTH -", item['options'].length)
            if(item['options'].length <= getCheckboxOrMultipleLimit()){
               let currentInitialVals = initialValues[item['name']]
               let newVals = currentInitialVals.map(function(itm) {
                 return itm['value'];
               });
               newInitialValues[item['name']] = newVals;
            }
          }
        });

       return newInitialValues;
    }

    const getThemeType = () => {
      return this.props.schema.meta?.theme ? this.props.schema.meta.theme : ""
    }

    const isInline = () => {
      return this.props.schema.meta?.inline ? "inline" : ""
    }

    //console.log("---->>>generalformik props", this.props)

    return (
      <div id={this.props.schema.id} className={"general-formik standard-padding " + isInline() + " " + getThemeType()}>
         <Formik
           initialValues={getInitialValues(this.props.schema.initialValues, this.props.schema.fields)}
           validationSchema= {createYupSchema(this.props.schema.fields)}
           onSubmit={this.submitMyForm}
           innerRef={this.visitFormRef}
           //enableReinitialize={true}
         >
           {(props) => {

              if (this.props.externalControlRef) {
                this.props.externalControlRef.current = props.setFieldValue; // 🟥 assigning the method to the external ref
              }

               return (
                 <Form id={this.props.id} onKeyDown={this.onKeyDown}>
                    <FieldMaker schema={this.props.schema} values={props.values} fieldChanged={this.fieldChanged} onErrorHandle={this.onErrorHandle} />
                    <ButtonMaker schema={this.props.schema} />
                 </Form>
               )
              }
           }
         </Formik>
      </div>
    )
  }
}

export default GeneralFormik
