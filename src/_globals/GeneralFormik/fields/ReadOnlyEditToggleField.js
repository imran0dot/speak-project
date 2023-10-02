import React, { Component } from 'react';

import moment from 'moment';
import TextInputField from './TextInputField';
import {_switchPart} from '../Helper';

class RangeTextInputField extends Component {
    constructor(props, context) {
      super(props, context);
        this.state = {
          showToggle: false
        };
    }

    _getLabelFromOptions(item, values) {
        let labels = [];

        item.options.forEach(function (itm) {
            if(values.includes(itm.value)){
                labels.push(itm.label)
            }
        });

        if(labels.length <= 0){
            return "N/A";
        } else {
            return labels.join(", ");
        }
    }

    _getMultipleLabelFromOptions(item, values) {
        let labels = [];

        values.forEach(function (itm) {
            labels.push(itm.label);
        });

        return labels.join(", ");
    }

    _showStartAdornment(item){
        if(item.startAdornment){
            return item.startAdornment;
        }
    }

    _showEndAdornment(item){
        if(item.endAdornment){
            return item.endAdornment;
        }
    }

    _getDateRange(item, value){
        let fmt = "D MMM YYYY";
        let date1 = value[item.fields[0].name];
        let date2 = value[item.fields[1].name];
        return date1.format(fmt) + " - " + date2.format(fmt) + " (" + date2.diff(date1, 'days') + " days)";
    }

    _displayPart(item, type, field){
        switch (type) {

          case "toggle_group":
            return (
                <p>toggle_group vals {field.value}</p>
            );

          case "checkbox":
            return (
                <p>{this._getLabelFromOptions(item, field.value)}</p>
            );

          case "checkboxormultiple":
            return (
                <p>checkboxormultiple vals {field.value}</p>
            );

          case "file":
            return (
                <p>file vals {field.value}</p>
            );

          case "date":
            return (
                <p>date vals {field.value}</p>
            );

          case "rating":
            return (
                <p>rating vals {field.value}</p>
            );

          case "hidden":
            return (
                <p>hidden vals {field.value}</p>
            );

          case "buttons":
            return (
              <>
                <p>buttons vals {field.value}</p>
              </>
            );

          case "slider":
            return (
                <p>slider vals {field.value}</p>
            );

          case "toggle":
            return (
               <p>toggle vals {field.value}</p>
            );

          case "radio":
            return (
              <p>{this._getLabelFromOptions(item, field.value)}</p>
            );

          case "select":
              return (
                <p>select vals {field.value}</p>
              )

        case "multiple":
            return (
                <p>{this._getMultipleLabelFromOptions(item, field.value)}</p>
            )

        case "range_date":
            return (
               <p>{this._getDateRange(item, field.value)}</p>
            )

         case "range_text":
            return (
                <p>range_text vals {field.value}</p>
            )

         case "multiple-popup-checkbox":
            return (
               <p>multiplepopup checkbox vals {field.value}</p>
            )

          case "popup-checkbox":
              return (
                    <p>popup checkbox vals {field.value}</p>
              )

          case "popup-radio":
              return (
                    <p>popup radio vals {field.value}</p>
              )

          case "toggle_text":
                return (
                    <p>readonly value in text {field.value}</p>
                )

          default:
                return (
                    <p>{this._showStartAdornment(item)}{field.value}{this._showEndAdornment(item)}</p>
                )
        }
    }

    render() {
      //const [toggleText, setToggleText] = useState(false);
      //showToggle

      return (
            <>
                {this.state.showToggle ?
                    (
                        <>
                            {_switchPart(this.props.item, this.props.item.orig_type, this.props.field, this.props.meta, this.props.form, this.props.onHandle)}

                             <a onClick={()=> {
                               this.setState((state) => ({ showToggle: !state.showToggle }));
                            }}>Edit</a>
                        </>
                    ):
                    (
                        <>
                            {this._displayPart(this.props.item, this.props.item.orig_type, this.props.field)}

                            {!this.props.item?.read_only && !this.props.item.read_only &&
                                (
                                    <a onClick={()=> {
                                       this.setState((state) => ({ showToggle: !state.showToggle }));
                                    }}>Edit</a>
                                )
                            }

                        </>
                    )
                }
            </>
      )
    }
}

export default RangeTextInputField
