import React from "react";
//import "./styles.css";
import * as yup from "yup";
import GeneralFormik from "../GeneralFormik/GeneralFormik";
import SpeechRecognitionModule from '../SpeechRecognitionModule/SpeechRecognitionModule';


export default class VoiceControlledForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transcriptText: "",
      aiResponse: "",
      controlledFields: []
    }

    this.processAnalysis = this.processAnalysis.bind(this);
    this.updateTranscriptText = this.updateTranscriptText.bind(this);

    /*
    this.schema3 = {
      id: "myform3",
      initialValues: {
        swelling: 1,
        pain_level: 1,
        wound_opening: [],
        healthy_regrowth_of_skin: [],
        throbbing: [],
        smelly_discharge: [],
        discolouration: "2",
        describe_your_symptoms_here: "xxx"
      },
      fields: [
        {
          type: "slider",
          name: "swelling",
          label: "Swelling",
          min: 1,
          max: 5,
          validation: yup.number().required("slider is required")
        },
        {
          type: "slider",
          name: "pain_level",
          label: "Pain level",
          min: 1,
          max: 5,
          validation: yup.number().required("slider is required")
        },
        {
          type: "checkbox",
          name: "wound_opening",
          label: "Wound opening",
          options: [
            {
              label: "Yes",
              value: "0"
              //"disabled": true
            }
          ]
          //"validation": yup.mixed().test('arraySize', "Must have at least one checked", value => value.length > 0),
          //"disabled": true
        },
        {
          type: "checkbox",
          name: "healthy_regrowth_of_skin",
          label: "Healthy regrowth of skin",
          options: [
            {
              label: "Yes",
              value: "0"
              //"disabled": true
            }
          ]
          //"validation": yup.mixed().test('arraySize', "Must have at least one checked", value => value.length > 0),
          //"disabled": true
        },
        {
          type: "checkbox",
          name: "throbbing",
          label: "Throbbing",
          options: [
            {
              label: "Yes",
              value: "0"
              //"disabled": true
            }
          ]
          //"validation": yup.mixed().test('arraySize', "Must have at least one checked", value => value.length > 0),
          //"disabled": true
        },
        {
          type: "checkbox",
          name: "smelly_discharge",
          label: "Smelly discharge",
          options: [
            {
              label: "Yes",
              value: "0"
              //"disabled": true
            }
          ]
          //"validation": yup.mixed().test('arraySize', "Must have at least one checked", value => value.length > 0),
          //"disabled": true
        },
        {
          //"disabled": true,
          type: "select",
          name: "discolouration",
          label: "Discolouration",
          options: [
            {
              label: "Yellow",
              value: "1"
            },
            {
              label: "Red",
              value: "2"
            },
            {
              label: "Brown",
              value: "3"
            },
            {
              label: "Black",
              value: "4"
            }
          ],
          validation: yup
            .string()
            .required("Minimum discolouration value is required")
          //"disabled": true
        },
        {
          type: "comment",
          name: "describe_your_symptoms_here",
          label: "Describe your symptoms here",
          validation: yup
            .string()
            .min(8, "Must be at least 8 characters")
            .max(20, "Must be less  than 20 characters")
            .required("Text field is required"),
          placeholder: "Text field",
          //"disabled": true,
          charLimit: 700
        }
      ],
      buttons: [
        {
          color: "primary",
          variant: "contained",
          type: "reset",
          label: "Reset"
        },
        {
          color: "secondary",
          variant: "contained",
          type: "submit",
          label: "Submit"
        }
      ]
    };
    */

    this.externalControlRef = React.createRef();

   
    this.handleChange = () => {
      window.dispatchEvent(
        new CustomEvent("formik_external_change", {
          detail: this.state.controlledFields
          //detail: this.props.controlledFields
          /*detail: [
            { name: "wound_opening", value: ["0"] },
            { name: "pain_level", value: 4 },
            { name: "healthy_regrowth_of_skin", value: ["0"] },
            { name: "discolouration", value: 3 },
            { name: "swelling", value: 2 },
            {
              name: "describe_your_symptoms_here",
              value: "Feeling dizzy"
            }
          ]*/
        })
      );
    };

    this.setFormValues = (json) => {
      json.forEach((field) =>
        this.externalControlRef.current(field.name, field.value)
      );
    };

    this.handleExternalFormikChange = (e) => {
      this.setFormValues(e.detail);
    };

  }

  componentDidMount() {
    window.addEventListener(
      "formik_external_change",
      this.handleExternalFormikChange
    );



    var controlledFields = [
      { name: "wound_opening", value: ["0"] },
      { name: "pain_level", value: 4 },
      { name: "healthy_regrowth_of_skin", value: ["0"] },
      { name: "discolouration", value: 3 },
      { name: "swelling", value: 2 },
      {
        name: "describe_your_symptoms_here",
        value: "Feeling dizzy"
      }
    ]

    this.setState({controlledFields: controlledFields})

    let that = this;

    setTimeout(function(){
      controlledFields = [
        { name: "wound_opening", value: [] },
        { name: "pain_level", value: 2 }
      ]
      that.setState({controlledFields: controlledFields})

    }, 5000)

    console.log("controlledFields", controlledFields)


  }

  componentWillUnmount() {
    window.removeEventListener(
      "formik_external_change",
      this.handleExternalFormikChange
    );
  }

  updateTranscriptText(transcriptText){
    this.setState({ transcriptText: transcriptText });
    console.log("===========transcriptText", transcriptText);
  }

  updateAIResponseText(aiResponse){
    this.setState({ aiResponse: aiResponse });
    console.log("===========aiResponse", aiResponse);
  }  



  /**
   * Searches for a regular expression in a given text and returns the matching groups.
   * If the regular expression is an array, it will search for each regular expression in the array until it finds a match.
   *
   * @param {string} text - The text to search for the regular expression.
   * @param {RegExp|string[]} regex - The regular expression to search for. If it is an array, it will search for each regular expression in the array until it finds a match.
   * @returns {Object|null} The matching groups found in the text, or null if no match was found.
   */
  getGroup(text, regex) {
    if (typeof regex == typeof [1, 2]) {

      for (const reg of regex) {
        let group = this.getGroup(text, reg)
        if (group) {
          return group
        }
      }
      return null
    }


    let group = null;
    regex = new RegExp(regex, "ig")


    for (const match of text.matchAll(regex)) {
      if (match) {
        group = match.groups
        break
      }
    }
    return group
  }




  /**
   * Extracts text from a given string using a regular expression and returns it as a JSON object with the given name.
   * 
   * @param {string} text - The text to extract from.
   * @param {string} name - The name of the extracted text.
   * @param {RegExp} regex - The regular expression to use for extracting the text.
   * @param {string} invalid - An error message to return if the extracted text is invalid.
   * @param {number} [min=0] - The minimum length of the extracted text.
   * @param {number} [max=-1] - The maximum length of the extracted text. If set to -1, there is no maximum length.
   * @returns {Object|null} A JSON object with the extracted text and its name, or null if the extracted text is invalid.
   */
  textExtractor(text, name, regex, invalid, min = 0, max = -1) {
    let group = this.getGroup(text, regex)
    if (group && group.value) {
      let value = group.value
      
      if (value.length < min) {
        return this.returner(name, null, "Must be at least 8 characters")
      } else if (max >= 0 && value.length > max) {
        return this.returner(name, null, "Must be less than 20 characters")
      }
      return this.returner(name, value)
    } else {
      return null

    }
  }


  /**
   * Returns a JSON object with the given name, value, and message.
   *
   * @param {string} name - The name of the value being returned.
   * @param {any} value - The value being returned.
   * @param {string} [message=''] - An optional message to include with the returned value.
   * @returns {Object} A JSON object with the given name, value, and message.
   */
  returner(name, value, message = '') {
    // will return json data to return

    return {
      name: name,
      value: value,
      message: message
    }
  }


  extractor(text, type, name, label){

    console.log(text, type, name, label);

    var regex = "";
    let invalid = "Invalid Text";
    

    
    let min = 8
    let max = 20

      if (name == "swelling") {
        regex = [`swelling ((wa|i)s )?(?<value>.+)`
        ] 
        // name was of my doctor is john

      }    
      
    return this.textExtractor(text, name, regex, invalid, min, max)
  }

  /**
   * Converts a spoken text into a command based on the given fields.
   * 
   * @param {string} speech - The spoken text to convert into a command.
   * @param {Object[]} fields - An array of objects containing the fields to extract from the spoken text.
   * @returns {string|null} The extracted command, or null if no command was found.
   */
  convertSpeechTextToCommand(speech, fields) {
    
    /*
    //change my * to *

    //get spoken labels and spoken values -- 

    //loop through fields and test to see if label is spoken
    let value = this.casualChat(speech);
    if (value) {
      value = this.returner("chat", value)
      value.intent = "casual"
      return value;
    }

    */

    console.log("fields", fields);

    for (let i = 0; i < fields.length; i++) {
      let fieldLabels = fields[i].label;
      let fieldNames = fields[i].name;
      let type = fields[i].type;

 

        console.log("speech", speech);
        //const fieldLabels = ["pain level", "swelling", "wound opening"];
        const fieldOptions = ["1", "2", "3", "4", "5"];

        const fieldLabelRegex = new RegExp(`\\b(${fieldLabels})\\b`, "i");
        const fieldValueRegex = new RegExp(`\\b(${fieldOptions.join("|")})\\b`, "i");

        const fieldLabelMatch = speech.match(fieldLabelRegex);
        const fieldValueMatch = speech.match(fieldValueRegex);

        if (fieldLabelMatch && fieldValueMatch) {
          const fieldLabel = fieldLabelMatch[0];
          const fieldValue = parseInt(fieldValueMatch[0]);

          const obj = { name: fieldNames, value: fieldValue, label: fieldLabel };
          console.log(obj);
          return obj;
        }



      //let value = this.extractor(speech, type, name, label);
      //console.log("value", value);

      //if (value) {
      //  value.intent = "form"
      //  return value;
      //}
    }

     
    /*

    return null;
    */

  }

  textAnalysis(transcriptText){

    transcriptText ="Change my pain level to 4";

    console.log("props", this.props.schema.fields);
    var obj = this.convertSpeechTextToCommand(transcriptText, this.props.schema.fields);
    console.log("BACK -- obj", obj)
    var fieldLabel = obj.label;//"swelling";
    var fieldName = obj.name;//"swelling";
    var value = obj.value;

    var aiResponse = "Changing "+ fieldLabel +" to "+value+". Is this correct. Please repeat command if we heard the wrong value.";

    var that = this;
    this.timer = setTimeout(function(){
      that.updateTranscriptText(transcriptText);
      that.updateAIResponseText(aiResponse)
    }, 1)

    console.log("xxx", this.props.schema);
 
    //this.setState({ai_response: })

    var controlledFields = [
      { name: fieldName, value: value }
    ]
    this.setState({
      controlledFields: controlledFields
    })    
    var that = this;
    setTimeout(function(){
      that.handleChange()
    }, 1)


    /*
    var controlledFields = [
      { name: "wound_opening", value: [] },
      { name: "swelling", value: 2 }
    ]
    this.setState({
      controlledFields: controlledFields
    })

    var that = this;
    setTimeout(function(){
      that.handleChange()
    }, 1)
    */

  }

  processAnalysis(transcript, listening){

        function debounce(func, wait, immediate) {
          var timeout;
          return function() {
            var context = this, args = arguments;
            var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
          };
        }

        function throttle(func, wait, immediate) {
          var timeout;
          return function() {
            var context = this, args = arguments;
            var later = function() {
              timeout = null;
              if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            if ( !timeout ) timeout = setTimeout( later, wait );
            if (callNow) func.apply(context, args);
          };
        }


    console.log("===========><transcript", transcript);

    if(transcript.length>0 && !listening){
        console.log("WORDS ARE BEING SPOKEN");
        var that = this;

        var myEfficientFn = throttle(function() {
          console.log("CALLLLED CALLLED");
          that.textAnalysis(transcript)
        }, 1500);

        if(!listening){
          myEfficientFn();
        }
    }

    //
  }

  render() {


    return (
      <div className="App">
        <SpeechRecognitionModule 
          transcript={(transcript, listening)=>this.processAnalysis(transcript, listening)}
          //transcript={(transcript)=> this.textAnalysis(transcript)}
        />

        <button onClick={()=>this.updateTranscriptText("xxxxfdfdfd")}>update text</button>
        <button onClick={()=>this.textAnalysis("Change my swelling to 2")}>analyse words</button>

        <div className="speech-text">
          {this.state.transcriptText}
        </div>
        <div className="ai-text">{this.state.aiResponse}</div>        

        <button onClick={this.handleChange}>Check skin and change pain</button>
        <GeneralFormik
          externalControlRef={this.externalControlRef} //Passing the ref down
          schema={this.props.schema}
          submitHandler={this.props.submitHandler}
        />
      </div>
    );
  }
}