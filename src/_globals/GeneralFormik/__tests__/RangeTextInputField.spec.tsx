import React from 'react';
import GeneralFormik from "../GeneralFormik"
import * as yup from "yup";
import { expect, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let schema2 = {
  "initialValues": {
      "age_array": {"minAge": "18", "maxAge": "33"},
  },
  "fields": [
    {
      "type": "range_text",
      "name": "age_array",
      "label": "Example of array_textfield field",
     //"maxFile": 2,
      "fields": [
        {
          "type": "number",
          "label": "Min Age",
          "name": "minAge",
          //"disabled": true
        },
        {
          "type": "number",
          "label": "Max Age",
          "name": "maxAge",
          //"disabled": true
        }
      ],
      //"min": 10,
      //"max": 1000,
      //"range": true,
      //"validation": yup.array().min(2).required("both fields are required"),
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

describe('RangeTextInputField tests', () => {

  it('rendering and submitting a basic Formik form', async () => {
    const handleSubmit = jest.fn()

    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={handleSubmit} />)
    const user = userEvent.setup()

    await user.clear(screen.getByLabelText(/Min Age/i))
    //await user.type(screen.getByLabelText(/Min Age/i), "20")

    await fireEvent.change(screen.getByLabelText(/Min Age/i), { target: { value: "20" } })

    await user.click(screen.getByRole('button', {name: /submit/i}))

    await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
            age_array: {"minAge": "20", "maxAge": "33"},
        }),
    )
  })

  it('age_arrayEl should render', () => {
    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={()=>{jest.fn()}} />)
    const age_arrayEl = container.querySelector(`input[name="age_array"]`);
    expect(age_arrayEl).toBeDefined();
  })

});