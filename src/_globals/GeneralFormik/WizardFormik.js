import React, { Component } from 'react';
import { Formik, Field } from "formik";

import GeneralFormik from './GeneralFormik';
import * as yup from 'yup';

import FieldMaker from './FieldMaker';
import ButtonMaker from './ButtonMaker';

import {jsonToFormData} from './Helper';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const required = value => (value ? undefined : "Required");

class Wizard extends Component {
  static Page = ({ children, parentState }) => {
    console.log("parentState", parentState)
    return children(parentState);
  };

  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      values: props.initialValues
    };
  }

  next = values => {
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }));
  }

  previous = () => {
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));
  }

  /*
  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };
  */

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values, bag);
    } else {
      this.next(values);
      bag.setSubmitting(false);
    }
  };

  handlePrevious = () => {
    this.previous();
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;

    const handlePrevious = this.handlePrevious;

    const createYupSchema = (fields) => {
      const schema = fields.reduce((schema, field) => {
          return field.validation 
          ? {...schema, [field.name]: field.validation} 
          : schema
      }, {})

      return yup.object().shape(schema)
    }

    //console.log("this schema for this form", this.props.schema.forms[this.state.page])
    //console.log("THIS CHILD", children[this.state.page])

    return (
      <>
        <Formik
          initialValues={values}
          enableReinitialize={false}
          //validate={this.validate}
          validationSchema= {createYupSchema(this.props.schema.forms[this.state.page].fields)}
          onSubmit={this.handleSubmit}
          render={props => (
            <form onSubmit={props.handleSubmit}>
              {React.cloneElement(activePage, { parentState: { ...props, handlePrevious } })}
            </form>
          )}
        />
      </>
    );
  }
}

class WizardFormik extends Component {

    constructor(props) {
      super(props);
      this.onErrorHandle = this.onErrorHandle.bind(this);
      this.fieldChanged = this.fieldChanged.bind(this);
    }

    onErrorHandle(field, meta){
       console.log("onErrorHandle")
       if(this.props.onErrorHandle){
           this.props.onErrorHandle({"field_name": field, "meta": meta});
       }       
    }

    fieldChanged(field, value){
      console.log("fieldChanged")
      if(this.props.fieldChanged){
        this.props.fieldChanged({"field_name": field, "value": value});
      }
    }

    render() {

        return (
          <div className="wizard-formik standard-padding">
            <Wizard
              initialValues={this.props.schema.initialValues}
              schema={this.props.schema}
              onSubmit={(values, actions) => {
                sleep(300).then(() => {
                  actions.setSubmitting(false);

                  if(this.props.returnAsFormData){
                    values = jsonToFormData(values);
                  }
                  
                  this.props.submitHandler(values);
                });
              }}
            >

              {this.props.schema.forms.map((form, i) => 
                (
                  <Wizard.Page key={i}>
                    {props => (
                      <>
                        <FieldMaker schema={form} values={props.values} fieldChanged={this.fieldChanged} onErrorHandle={this.onErrorHandle} />
                        <ButtonMaker schema={form} previous={props.handlePrevious} />
                      </>
                    )}
                  </Wizard.Page>
                )
              )} 
              
            </Wizard>
          </div>
        )
    }
};

export default WizardFormik;
