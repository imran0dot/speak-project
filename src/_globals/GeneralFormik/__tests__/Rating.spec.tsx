import React from 'react';
import GeneralFormik from "../GeneralFormik"
import * as yup from "yup";
import { expect, jest } from '@jest/globals';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const crypto = require('crypto');

Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
});

let schema2 = {
  "initialValues": {
      "rating_field": 2,
  },
  "fields": [
    {
      "type": "rating",
      "name": "rating_field",
      "label": "Rating field",
      "max": 10,
      "validation": yup.string().required("rating is required").nullable(),
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

    await act(async () => {
     await user.click(screen.getByLabelText(/3.5 Stars/i));
    });

    expect(screen.getByLabelText(/3.5 Stars/i)).toBeChecked();

    await user.click(screen.getByRole('button', {name: /submit/i}))

    await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
            rating_field: 3.5
        }),
    )
  })

  it('rating_fieldEl should render', () => {
    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={()=>{jest.fn()}} />)
    const rating_fieldEl = container.querySelector(`input[name="rating_field"]`);
    expect(rating_fieldEl).toBeDefined();
  })

});
