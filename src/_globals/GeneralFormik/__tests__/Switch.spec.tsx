import React from 'react';
import GeneralFormik from "../GeneralFormik"
import * as yup from "yup";
import { expect, jest } from '@jest/globals';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let schema2 = {
  "initialValues": {
      "toggle_field": false,
  },
  "fields": [
    {
      "type": "toggle",
      "name": "toggle_field",
      "label": "Toggle field",
      "validation": yup.boolean().oneOf([true], "toggle must be accepted.")
      //"disabled": true
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

describe('Switch Input tests', () => {

  it('rendering and submitting a basic Formik form', async () => {
    const handleSubmit = jest.fn()

    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={handleSubmit} />)
    const user = userEvent.setup()

    //await user.click(screen.getByRole('switch', { name: 'toggle_field' }))
    await act(async () => {
     await user.click(screen.getByRole("switch"));
    });

    expect(screen.getByRole("switch")).toBeChecked();

    await user.click(screen.getByRole('button', {name: /submit/i}))

    await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
            toggle_field: true
        }),
    )
  })

  it('toggle_fieldEl should render', () => {
    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={()=>{jest.fn()}} />)
    const toggle_fieldEl = container.querySelector(`input[name="toggle_field"]`);
    expect(toggle_fieldEl).toBeDefined();
  })

});

