import React from 'react';
import GeneralFormik from "../GeneralFormik"
import * as yup from "yup";
import { expect, jest } from '@jest/globals';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let schema2 = {
  "initialValues": {
      "slider_field": 142,
  },
  "fields": [
    {
      "type": "slider",
      "name": "slider_field",
      "label": "Example of slider field",
      "min": 50,
      "max": 1000,
      "validation": yup.number().required("slider is required"),
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

describe('Slider Input tests', () => {

  it('rendering and submitting a basic Formik form', async () => {
    const handleSubmit = jest.fn()

    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={handleSubmit} />)
    const user = userEvent.setup()

    const sliderInput = screen.getByTestId("slider")

    // mock the getBoundingClientRect
    sliderInput.getBoundingClientRect = jest.fn(() => {
      return {
        bottom: 286.22918701171875,
        height: 28,
        left: 19.572917938232422,
        right: 583.0937919616699,
        top: 258.22918701171875,
        width: 563.5208740234375,
        x: 19.572917938232422,
        y: 258.22918701171875,
      }
    })

    expect(sliderInput).toBeInTheDocument()

    await fireEvent.mouseDown(sliderInput, { clientX: 162, clientY: 302 })

    await user.click(screen.getByRole('button', {name: /submit/i}))

    await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
            slider_field: 290
        }),
    )
  })

  it('slider_fieldEl should render', () => {
    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={()=>{jest.fn()}} />)
    const slider_fieldEl = container.querySelector(`input[name="slider_field"]`);
    expect(slider_fieldEl).toBeDefined();
  })

});

