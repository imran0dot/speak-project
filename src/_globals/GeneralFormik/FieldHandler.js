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

import {getCheckboxOrMultipleLimit, getLabelVisibility, getHelperVisibility} from './Constants';

import {_switchPart} from './Helper';

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

class FieldHandler extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      showToggle: false,
      open: false,
      anchorEl: null
    };
  }

  componentDidMount(){
  }

/*
  toggle = (event) => {
    console.log("cli", this)
    console.log("clicked on popper", event)
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget
    });
  };

  handleMultiplePops = (event, key) => {
    console.log("cli", this)
    console.log("clicked on multi-popper", event)
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget,
      active: key
    });
  };

  handleOpen = () => {
    console.log("open")
    this.setState({ open: true });
  };

  handleClose = () => {
    console.log("close")
    this.setState({ open: false });
  };
  */

/*
  _switchPart(item, field, meta, form){

    switch (item.type) {

      case "toggle_group":
        return (
          <ToggleGroupField
            name={item.name}
            disabled={item.disabled}
            item={item}
            field={field}
            form={form}
            onHandle={this.props.onHandle}
          />
        );

      case "checkbox":
        return (
          <CheckboxGroupField
            name={item.name}
            disabled={item.disabled}
            item={item}
            field={field}
            form={form}
            onHandle={this.props.onHandle}
          />
        );

      case "checkboxormultiple":
        return (
          <>
              {item.options.length <= getCheckboxOrMultipleLimit()?
                (
                  <CheckboxGroupField
                    name={item.name}
                    disabled={item.disabled}
                    item={item}
                    field={field}
                    form={form}
                    onHandle={this.props.onHandle}
                  />
                ):
                (
                  <MultipleField
                     name={item.name}
                     field={field}
                     item={item}
                     form={form}
                     onHandle={this.props.onHandle}
                  />
                )
              }
          </>
        );

      case "file":
        return (
            <FileField
                name={item.name}
                item={item}
                field={field}
                form={form}
                onHandle={this.props.onHandle}
            />
        );

      case "date":
        return (
            <DateField
                name={item.name}
                item={item}
                field={field}
                form={form}
                onHandle={this.props.onHandle}
            />
        );

      case "rating":
        return (
            <RatingField
                name={item.name}
                item={item}
                field={field}
                form={form}
                onHandle={this.props.onHandle}
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
                name={item.name}
                item={item}
                field={field}
                form={form}
                onHandle={this.props.onHandle}
              />
          </>
        );

      case "slider":
        return (
            <SliderField
                name={item.name}
                item={item}
                field={field}
                form={form}
                onHandle={this.props.onHandle}
            />
        );

      case "toggle":
        return (
          <ToggleField
            name={item.name}
            item={item}
            field={field}
            form={form}
            onHandle={this.props.onHandle}
          />
        );

      case "radio":
        return (
          <RadioGroupField
            name={item.name}
            field={field}
            item={item}
            onHandle={this.props.onHandle}
          />
        );

      case "select":
          return (
            <SelectField
                 name={item.name}
                 field={field}
                 item={item}
                 form={form}
                 onHandle={this.props.onHandle}
            />
          )

    case "multiple":
        return (
            <MultipleField
                 name={item.name}
                 field={field}
                 item={item}
                 form={form}
                 onHandle={this.props.onHandle}
            />
        )

    case "range_date":
        return (
              <RangeDateField
                name={item.name}
                item={item}
                field={field}
                //form={form}
                onHandle={this.props.onHandle}
              />
        )
        
     case "geo_map":
        return (
              <GeoMapInputField
                name={item.name}
                item={item}
                field={field}
                //form={form}
                onHandle={this.props.onHandle}
              />
        )

     case "range_text":
        return (
              <RangeTextInputField
                name={item.name}
                item={item}
                field={field}
                //form={form}
                onHandle={this.props.onHandle}
              />
        )

     case "multiple-popup-checkbox":
            return (
                  <MultiplePopupCheckboxField
                      name={item.name}
                      item={item}
                      field={field}
                      form={form}
                      onHandle={this.props.onHandle}
                  />
            )

      case "popup-checkbox":
          return (
                <PopupCheckboxField
                  name={item.name}
                  item={item}
                  field={field}
                  form={form}
                  onHandle={this.props.onHandle}
                />
          )

      case "popup-radio":
          return (
                <PopupRadioField
                     name={item.name}
                     item={item}
                     field={field}
                     //form={form}
                     onHandle={this.props.onHandle}
                />
          )

      case "toggle_text":
            return (
                <>
                    <ReadOnlyEditToggleField
                         name={item.name}
                         item={item}
                         field={field}
                         meta={meta}
                         form={form}
                         onHandle={this.props.onHandle}
                    />
                </>
            )

      default: 
            return (
                <TextInputField
                     name={item.name}
                     item={item}
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
    let item = this.props.item;
    let values = this.props.values;

    //console.log("---->>>field handler props", this.props)
    return (        
     <Field                       
      name={item.name}
     >
       {({
         field, // { name, value, onChange, onBlur }
         form,
         meta,
       }) => (
         <div className={"field field-"+item.type}>

            {(getLabelVisibility(item)) &&
              <FormLabel component="legend">
                {item.label}
              </FormLabel>
            }

            {/*this._switchPart(item, field, meta, form)*/}
            {_switchPart(item, item.type, field, meta, form, this.props.onHandle, this.props.onErrorHandle)}

            {(getHelperVisibility(values, item)) &&
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
    )
  }
}

export default FieldHandler