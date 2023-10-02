import React from 'react';
import GeneralFormik from "../GeneralFormik"
import * as yup from "yup";
import { expect, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let schema2 = {
  "initialValues": {
      "first_name": "",
  },
  "fields": [
    {
      "type": "text",
      "name": "first_name",
      "label": "First Name",
      "validation": yup.string().min(3, 'Must be at least 3 characters').max(20, 'Must be less  than 20 characters').required("Text field is required"),
      "placeholder": "What is your first name",
    }
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

describe('Text Input tests', () => {

  it('rendering and submitting a basic Formik form', async () => {
    const handleSubmit = jest.fn()

    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={handleSubmit} />)
    const user = userEvent.setup()

    await user.type(screen.getByLabelText(/First Name/i), 'John')

    await user.click(screen.getByRole('button', {name: /submit/i}))

    await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
            first_name: 'John'
        }),
    )
  })

  it('first_nameEl should render', () => {
    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={()=>{jest.fn()}} />)
    const first_nameEl = container.querySelector(`input[name="first_name"]`);
    expect(first_nameEl).toBeDefined();
  })

  //test last_name
  //test adornment

});