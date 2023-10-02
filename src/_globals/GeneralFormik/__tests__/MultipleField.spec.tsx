import React from 'react';
import GeneralFormik from "../GeneralFormik"
import * as yup from "yup";
import { expect, jest } from '@jest/globals';
import { act, render, fireEvent, screen, waitFor, within, wait } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let schema2 = {
  "initialValues": {
      "multiselect_field": [{"label": "Option 1", "value": "0"}, {"label": "Option 2", "value": "1"}],
  },
  "fields": [
        {
          "type": "multiple",
          "name": "multiselect_field",
          "label": "Example of select field",
          "options": [
            {
              "label": "Option 1",
              "value": "0"
            }, {
              "label": "Option 2",
              "value": "1"
            }, {
              "label": "Option 3",
              "value": "2"
            }, {
              "label": "Option 4",
              "value": "3"
            }, {
              "label": "Other",
              "value": "4"
            }
          ],
          //"validation": yup.mixed().test('arraySize', "Must have at least one checked", value => value.length > 0)
          //"disabled": true
        },
  ],
  "buttons": [
    {
      "color": "primary",
      "variant": "contained",
      "type": "reset",
      "label": "Reset",
    },
    {
      "color": "secondary",
      "variant": "contained",
      "type": "submit",
      "label": "Submit",
    }
  ]
}

describe('SelectField tests', () => {

  it('rendering and submitting a basic Formik form', async () => {
      const handleSubmit = jest.fn()
      const { container  } = render(<GeneralFormik schema={schema2} submitHandler={handleSubmit} />)
      const user = userEvent.setup()

      const autocomplete = screen.getByTestId('autocomplete');
      const input = within(autocomplete).getByRole('combobox')
      autocomplete.focus()

        await act(async () => {
            // the value here can be any string you want, so you may also consider to
            // wrapper it as a function and pass in inputValue as parameter
            await fireEvent.change(input, { target: { value: '2' } })
            await fireEvent.keyDown(autocomplete, { key: 'ArrowDown' })
            await fireEvent.keyDown(autocomplete, { key: 'Enter' })
        });
  })

  it('multiselect_fieldEl should render', () => {
    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={()=>{jest.fn()}} />)
    const multiselect_fieldEl = container.querySelector(`input[name="multiselect_field"]`);
    expect(multiselect_fieldEl).toBeDefined();
  })

});




