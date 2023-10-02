import React, { Component } from 'react';

//import ReactDOM from 'react-dom';
import { Formik, Form } from 'formik';

import * as yup from 'yup';
//+import Button from '@mui/material/Button';
import FieldHandler from './FieldHandler';
import FieldArrayHandler from './FieldArrayHandler';

import './GeneralFormik.scss';

class FieldMaker extends Component {

    constructor(props, context) {
      super(props, context);
      this.onHandle = this.onHandle.bind(this);
      this.onErrorHandle = this.onErrorHandle.bind(this);
      this.state = {
        fields: this.props.schema.fields,
      };
    }

    toggleFieldVisibility(pos, isVisibile) {
      let fields = {...this.state.fields}
      fields[pos]["visibility"] = isVisibile;
    }

    componentDidMount(){
      //identify slaves and hide by default
      let slaves = [];
      for(let i = 0; i < this.state.fields.length; i++){
        //apply field visibility in all states
        this.toggleFieldVisibility(i, true);

        //create slave array
        if(this.state.fields[i].slave){
          slaves.push(this.state.fields[i].slave);
        }
      }
      this.setState({ slaves: slaves }, this.hideSlaves);
    }

    hideSlaves(){

      if(this.state.slaves){

        for(let i = 0; i < this.state.fields.length; i++){
          for(let j = 0; j < this.state.slaves.length; j++){
            for(let x = 0; x < this.state.slaves[j].length; x++){

              if(this.state.slaves[j][x].slaveName === this.state.fields[i].name){
                //only if they are not prefilled in....

                let masterName = this.state.slaves[j][x].masterName;
                let onMasterVal = this.state.slaves[j][x].onMasterVal;

                if (this.props.values[masterName].constructor == Array){
                    if(!(this.props.values[masterName].includes(onMasterVal))){
                      this.toggleFieldVisibility(i, false);
                    }
                } else {
                    if(!(this.props.values[masterName] === onMasterVal)){
                      this.toggleFieldVisibility(i, false);
                    }
                }

              }
            }
          }
        }

      }

    }

    onHandle(fieldName, newValue){

      if(this.state.slaves){
        //loop over the slaves

        for(let j = 0; j < this.state.slaves.length; j++){
          for(let x = 0; x < this.state.slaves[j].length; x++){
            if(this.state.slaves[j][x].masterName.includes(fieldName)){

                if(newValue.includes(this.state.slaves[j][x].onMasterVal)){
                  //find slave and set field obj to toggle visibility to true
                  for(let c = 0; c < this.state.fields.length; c++){
                    if(this.state.slaves[j][x].slaveName === this.state.fields[c].name){
                      this.toggleFieldVisibility(c, true);
                    }
                  }
                } else{
                  //find slave and set field obj to toggle visibility to false
                  for(let c = 0; c < this.state.fields.length; c++){
                    if(this.state.slaves[j][x].slaveName === this.state.fields[c].name){
                      this.toggleFieldVisibility(c, false);
                      //delete this.state.values["radio_alternative_field"]
                      //delete this.state.values[this.state.fields[c].name];
                    }
                  }
                }

            }
          }
        }

          //if not visible remove from values object
      }

      this.props.fieldChanged(fieldName, newValue);
    }

    onErrorHandle(field, meta){
        //console.log("-- in fieldmaker - meta", field, meta)
        //console.log("this.props", this.props)
        if(this.props.onErrorHandle){
            this.props.onErrorHandle(field.name, meta);
        }
    }

    render() {
      //console.log("---->>>fieldmaker props", this.props)
      return (
           <>
              {this.state.fields &&
                (
                  this.state.fields.map((item, j) => {
                      if(item.visibility){
                          switch (item.type) {
                              case "fieldArray":
                                  return (
                                      <FieldArrayHandler key={j} item={item} values={this.props.values} onHandle={this.onHandle} onErrorHandle={this.onErrorHandle}/>
                                  )
                              default :
                                  return (
                                      <FieldHandler key={j} item={item} values={this.props.values} onHandle={this.onHandle} onErrorHandle={this.onErrorHandle}/>
                                  )
                          }
                      } else {
                          return(null)
                      }
                  })
                )
              }
           </>
      )
    }
}

export default FieldMaker
