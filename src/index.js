import React from 'react'
import ReactDOM from 'react-dom'

import VoiceControlledForm from './_globals/VoiceControlledForm/VoiceControlledForm'
import * as yup from 'yup'

function App() {
  let schema3 = {
    id: 'myform3',
    initialValues: {
      swelling: 5,
      pain_level: 2,
      wound_opening: [],
      healthy_regrowth_of_skin: [],
      throbbing: [],
      smelly_discharge: [],
      discolouration: '2',
      describe_your_symptoms_here: 'xxx',
    },
    fields: [
      {
        type: 'slider',
        name: 'swelling',
        label: 'Swelling',
        min: 1,
        max: 5,
        validation: yup.number().required('slider is required'),
      },
      {
        type: 'slider',
        name: 'pain_level',
        label: 'Pain level',
        min: 1,
        max: 5,
        validation: yup.number().required('slider is required'),
      },
      {
        type: 'checkbox',
        name: 'wound_opening',
        label: 'Wound opening',
        options: [
          {
            label: 'Yes',
            value: '0',
            //"disabled": true
          },
        ],
        //"validation": yup.mixed().test('arraySize', "Must have at least one checked", value => value.length > 0),
        //"disabled": true
      },
      {
        type: 'checkbox',
        name: 'healthy_regrowth_of_skin',
        label: 'Healthy regrowth of skin',
        options: [
          {
            label: 'Yes',
            value: '0',
            //"disabled": true
          },
        ],
        //"validation": yup.mixed().test('arraySize', "Must have at least one checked", value => value.length > 0),
        //"disabled": true
      },
      {
        type: 'checkbox',
        name: 'throbbing',
        label: 'Throbbing',
        options: [
          {
            label: 'Yes',
            value: '0',
            //"disabled": true
          },
        ],
        //"validation": yup.mixed().test('arraySize', "Must have at least one checked", value => value.length > 0),
        //"disabled": true
      },
      {
        type: 'checkbox',
        name: 'smelly_discharge',
        label: 'Smelly discharge',
        options: [
          {
            label: 'Yes',
            value: '0',
            //"disabled": true
          },
        ],
        //"validation": yup.mixed().test('arraySize', "Must have at least one checked", value => value.length > 0),
        //"disabled": true
      },
      {
        //"disabled": true,
        type: 'select',
        name: 'discolouration',
        label: 'Discolouration',
        options: [
          {
            label: 'Yellow',
            value: '1',
          },
          {
            label: 'Red',
            value: '2',
          },
          {
            label: 'Brown',
            value: '3',
          },
          {
            label: 'Black',
            value: '4',
          },
        ],
        validation: yup
          .string()
          .required('Minimum discolouration value is required'),
        //"disabled": true
      },
      {
        type: 'comment',
        name: 'describe_your_symptoms_here',
        label: 'Describe your symptoms here',
        validation: yup
          .string()
          .min(8, 'Must be at least 8 characters')
          .max(20, 'Must be less  than 20 characters')
          .required('Text field is required'),
        placeholder: 'Text field',
        //"disabled": true,
        charLimit: 700,
      },
    ],
    buttons: [
      {
        color: 'primary',
        variant: 'contained',
        type: 'reset',
        label: 'Reset',
      },
      {
        color: 'secondary',
        variant: 'contained',
        type: 'submit',
        label: 'Submit',
      },
    ],
  }

  return (
    <VoiceControlledForm
      schema={schema3}
      submitHandler={function (data) {
        console.log('new data in parent1', data)
      }}
    />
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
