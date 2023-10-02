import React from 'react';
import GeneralFormik from "../GeneralFormik"
import * as yup from "yup";
import { expect, jest } from '@jest/globals';
import { act, render, fireEvent, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let schema2 = {
  "initialValues": {
      "select_field": "1",
  },
  "fields": [
        {
          "type": "select",
          "name": "select_field",
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
          "validation": yup.mixed().test('arraySize', "Must have at least one checked", value => value.length > 0)
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

      const selectEl = await screen.findByLabelText(/Option 2/i);
      expect(selectEl).toBeInTheDocument();
      user.click(selectEl);

      const optionsPopupEl = await screen.findByRole("listbox", {value: "2"});
      user.click(within(optionsPopupEl).getByText(/Option 3/i));

      expect(await screen.findByText(/Option 3/i)).toBeInTheDocument();
  })

  it('select_fieldEl should render', () => {
    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={()=>{jest.fn()}} />)
    const select_fieldEl = container.querySelector(`input[name="select_field"]`);
    expect(select_fieldEl).toBeDefined();
  })

});




