import React, { Component } from 'react';
import { /*Formik, Form,*/ Field, FieldArray } from 'formik';

import HiddenField from './fields/HiddenField';
import RadioGroupField from './fields/RadioGroupField';
import ToggleField from './fields/ToggleField';
import ToggleGroupField from './fields/ToggleGroupField';
import CheckboxGroupField from './fields/CheckboxGroupField';
import DateField from './fields/DateField';
import RangeTextInputField from './fields/RangeTextInputField';
import GeoMapInputField from './fields/GeoMapInputField';
import RangeDateField from './fields/RangeDateField';
import SliderField from './fields/SliderField';
import SelectField from './fields/SelectField';
import MultipleField from './fields/MultipleField';
import RatingField from './fields/RatingField';
import PopupRadioField from './fields/PopupRadioField';
import PopupCheckboxField from './fields/PopupCheckboxField';
import TextInputField from './fields/TextInputField';
import FileField from './fields/FileField';
import ButtonGroupField from './fields/ButtonGroupField';
import MultiplePopupCheckboxField from './fields/MultiplePopupCheckboxField';
import ReadOnlyEditToggleField from './fields/ReadOnlyEditToggleField';
import DecIncInputField from './fields/DecIncInputField';
import ComboSelectKnobField from './fields/ComboSelectKnobField';
import HeatmapCalendarField from './fields/HeatmapCalendarField';
import TimeInputField from './fields/TimeInputField';
import PolygonManField from './fields/PolygonManField';


import {getCheckboxOrMultipleLimit, getLabelVisibility, getHelperVisibility} from './Constants';

//text
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

//select
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

//radio
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

//multiple
import Autocomplete from "@mui/material/Autocomplete";

//toggle
import Switch from '@mui/material/Switch';

//slider
import Slider from '@mui/material/Slider';

//buttons
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

//hidden

//rating
import Rating from '@mui/material/Rating';
import { uuid } from '../Utility/Utility';

//date
import moment from 'moment';
//import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
//import DateFnsUtils from "@date-io/date-fns";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//file
import FileCopyIcon from '@mui/icons-material/FileCopy';

//checkbox
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';

//popup checkbox/radio
import Popover from '@mui/material/Popover';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';

export function _switchPart(item, type, field, meta, form, onHandle, onErrorHandle){

    switch (type) {

      case "toggle_group":
        return (
          <ToggleGroupField
            name={field.name}
            disabled={item.disabled}
            item={item}
            field={field}
            form={form}
            onHandle={onHandle}
          />
        );

      case "checkbox":
        return (
          <CheckboxGroupField
            name={field.name}
            disabled={item.disabled}
            item={item}
            field={field}
            form={form}
            onHandle={onHandle}
          />
        );

      case "checkboxormultiple":
        return (
          <>
              {item.options.length <= getCheckboxOrMultipleLimit()?
                (
                  <CheckboxGroupField
                    name={field.name}
                    disabled={item.disabled}
                    item={item}
                    field={field}
                    form={form}
                    onHandle={onHandle}
                  />
                ):
                (
                  <MultipleField
                     name={field.name}
                     field={field}
                     item={item}
                     form={form}
                     onHandle={onHandle}
                  />
                )
              }
          </>
        );

      case "file":
        return (
            <FileField
                name={field.name}
                item={item}
                field={field}
                form={form}
                onHandle={onHandle}
            />
        );

      case "date":
        return (
            <DateField
                name={field.name}
                item={item}
                field={field}
                form={form}
                onHandle={onHandle}
            />
        );

      case "rating":
        return (
            <RatingField
                name={field.name}
                item={item}
                field={field}
                form={form}
                onHandle={onHandle}
            />
        );

      case "hidden":
        return (
            <HiddenField
                type={item.type}
                disabled={item.disabled}
                field={field}
            />
        );

      case "buttons":
        return (
          <>
              <ButtonGroupField
                name={field.name}
                item={item}
                field={field}
                form={form}
                onHandle={onHandle}
              />
          </>
        );

      case "slider":
        return (
            <SliderField
                name={field.name}
                item={item}
                field={field}
                form={form}
                onHandle={onHandle}
            />
        );

      case "toggle":
        return (
          <ToggleField
            name={field.name}
            item={item}
            field={field}
            form={form}
            onHandle={onHandle}
          />
        );

      case "radio":
        return (
          <RadioGroupField
            name={field.name}
            field={field}
            item={item}
            onHandle={onHandle}
          />
        );

      case "select":
          return (
            <SelectField
                 name={field.name}
                 field={field}
                 item={item}
                 form={form}
                 onHandle={onHandle}
            />
          )

    case "multiple":
        return (
            <MultipleField
                 name={field.name}
                 field={field}
                 item={item}
                 form={form}
                 onHandle={onHandle}
            />
        )

    case "range_date":
        return (
              <RangeDateField
                name={field.name}
                item={item}
                field={field}
                //form={form}
                onHandle={onHandle}
                onErrorHandle={onErrorHandle}
              />
        )

     case "geo_map":
        return (
              <GeoMapInputField
                name={field.name}
                item={item}
                field={field}
                form={form}
                onHandle={onHandle}
                onErrorHandle={onErrorHandle}
              />
        )

     case "range_text":
        return (
              <RangeTextInputField
                name={field.name}
                item={item}
                field={field}
                //form={form}
                onHandle={onHandle}
                onErrorHandle={onErrorHandle}
              />
        )

     case "combo_select_knob":
        return (
              <ComboSelectKnobField
                name={field.name}
                item={item}
                field={field}
                //form={form}
                onHandle={onHandle}
                onErrorHandle={onErrorHandle}
              />
        )

     case "decrement_increment":
        return (
              <DecIncInputField
                   name={field.name}
                   item={item}
                   field={field}
                   form={form}
                   meta={meta}
                   onHandle={onHandle}
              />
        )

     case "multiple-popup-checkbox":
            return (
                  <MultiplePopupCheckboxField
                      name={field.name}
                      item={item}
                      field={field}
                      form={form}
                      onHandle={onHandle}
                  />
            )

      case "popup-checkbox":
          return (
                <PopupCheckboxField
                  name={field.name}
                  item={item}
                  field={field}
                  form={form}
                  onHandle={onHandle}
                />
          )

      case "popup-radio":
          return (
                <PopupRadioField
                     name={field.name}
                     item={item}
                     field={field}
                     //form={form}
                     onHandle={onHandle}
                />
          )

      case "heatmap_calendar":
            return (
                <>
                    <HeatmapCalendarField
                         name={field.name}
                         item={item}
                         field={field}
                         meta={meta}
                         form={form}
                         onHandle={onHandle}
                    />
                </>
            )

      case "time_picker":
            return (
                <>
                    <TimeInputField
                         name={field.name}
                         item={item}
                         field={field}
                         meta={meta}
                         form={form}
                         onHandle={onHandle}
                    />
                </>
            )


      case "polygon_man":
            return (
                <>
                    <PolygonManField
                         name={field.name}
                         item={item}
                         field={field}
                         meta={meta}
                         form={form}
                         onHandle={onHandle}
                    />
                </>
            )

      case "toggle_text":
            return (
                <>
                    <ReadOnlyEditToggleField
                         name={field.name}
                         item={item}
                         field={field}
                         meta={meta}
                         form={form}
                         onHandle={onHandle}
                    />
                </>
            )

      default:
            return (
                <TextInputField
                     name={field.name}
                     item={item}
                     field={field}
                     form={form}
                     meta={meta}
                     onHandle={onHandle}
                />
            )
    }
}


export function buildFormData(formData, data, parentKey) {
  if(data.$d){
    data = moment(data).format('YYYY-MM-DD');
  }

  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
    Object.keys(data).forEach(key => {


      if(data[key] instanceof File){
        buildFormData(formData, data[key], parentKey ? `${parentKey}` : key);
      } else {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      }

    });
  } else {
    const value = data == null ? '' : data;

    formData.append(parentKey, value);
  }
}


export function jsonToFormData(data) {
  console.log("xxxxxxx data", data);

  const formData = new FormData();
  
  buildFormData(formData, data);

/*
email: test1@test.com
password: 1234567
name: Ted Stantsford
image[]: 
country: GB
image[0]: (binary)
image[1]: (binary)
image[2]: (binary)
*/


/*
    formData.append("email", data.email);

    // Retrieve FileList boject
    const files = data.image;
    console.log("files---", files)

    if(files){
      // Loop through files
      for (let i = 0; i < files.length; i++) {
        let file = files.item(i)
        console.log(file.name)

        formData.append("image", file);
      }
    }
*/

    //formData.append("image", data.email);
  
    console.log("xxxxxformData", formData);

    /*
      email: test1@test.com
      image: (binary)
      image: (binary)
      image: (binary)
    */

  return formData;
}


export function jsonToFormData2(data) {

    const formData = new FormData()
    const entries = Object.entries(data) // returns array of object property as [key, value]
    // https://medium.com/front-end-weekly/3-things-you-didnt-know-about-the-foreach-loop-in-js-ff02cec465b1

    for (let i = 0; i < entries.length; i++) {
      // don't try to be smart by replacing it with entries.each, it has drawbacks
      const arKey = entries[i][0]
      let arVal = entries[i][1]
      if (typeof arVal === 'boolean') {
        arVal = arVal === true ? 1 : 0
      }
      if (Array.isArray(arVal)) {
        console.log('displaying arKey')
        console.log(arKey)
        console.log('displaying arval')
        console.log(arVal)

        if (this.isFile(arVal[0])) {
          for (let z = 0; z < arVal.length; z++) {
            formData.append(`${arKey}[]`, arVal[z])
          }

          continue // we don't need to append current element now, as its elements already appended
        } else if (arVal[0] instanceof Object) {
          for (let j = 0; j < arVal.length; j++) {
            if (arVal[j] instanceof Object) {
              // if first element is not file, we know its not files array
              for (const prop in arVal[j]) {
                if (Object.prototype.hasOwnProperty.call(arVal[j], prop)) {
                  // do stuff
                  if (!isNaN(Date.parse(arVal[j][prop]))) {
                    // console.log('Valid Date \n')
                    // (new Date(fromDate)).toUTCString()
                    formData.append(
                      `${arKey}[${j}][${prop}]`,
                      new Date(arVal[j][prop])
                    )
                  } else {
                    formData.append(`${arKey}[${j}][${prop}]`, arVal[j][prop])
                  }
                }
              }
            }
          }
          continue // we don't need to append current element now, as its elements already appended
        } else {
          arVal = JSON.stringify(arVal)
        }
      }

      if (arVal === null) {
        continue
      }
      formData.append(arKey, arVal)
    }
    return formData

}

