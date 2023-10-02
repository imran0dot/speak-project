import React from 'react';
import GeneralFormik from "../GeneralFormik"
import * as yup from "yup";
import { expect, jest } from '@jest/globals';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let schema2 = {
  "initialValues": {
      "hidden_name": "peach",
  },
  "fields": [
    {
      "type": "hidden",
      "name": "hidden_name",
      "label": "Hidden Name",
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

describe('HiddenField tests', () => {

  it('rendering and submitting a basic Formik form', async () => {
    const handleSubmit = jest.fn()

    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={handleSubmit} />)
    const user = userEvent.setup()

    const hiddenField = screen.getByTestId('hidden');
    expect(hiddenField).toBeInTheDocument();

    await user.click(screen.getByRole('button', {name: /submit/i}))

    await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
            hidden_name: 'peach'
        }),
    )

  })

  it('hidden_nameEl should render', () => {
    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={()=>{jest.fn()}} />)
    const hidden_nameEl = container.querySelector(`input[name="hidden_name"]`);
    expect(hidden_nameEl).toBeDefined();
  })

});