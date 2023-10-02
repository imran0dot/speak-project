import React from 'react';
import GeneralFormik from "../GeneralFormik"
import * as yup from "yup";
import { expect, jest } from '@jest/globals';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let schema2 = {
  "initialValues": {
     "multiple_chips_array": {"dons_ford": ["0"], "acquisition": ["0"], "ford_only": ["0"], "ford_mustang": ["0"], "male_25_35": ["0"]},
  },
  "fields": [
        {
          "type": "multiple-popup-checkbox",
          "name": "multiple_chips_array",
          "label": "Example of array_multiple_popup checkbox_array field",
         //"maxFile": 2,
          "fields": [
            {
              "type": "popup-checkbox",
              "label": "Don's Ford",
              "name": "dons_ford",
              "options": [
                {
                  "label": "Option dons_ford 1",
                  "value": "0",
                }, {
                  "label": "Option dons_ford 2",
                  "value": "1",
                }, {
                  "label": "None",
                  "value": ""
                }
              ],
              //"disabled": true
            },
            {
              "type": "popup-checkbox",
              "label": "Acquisition",
              "name": "acquisition",
              "options": [
                {
                  "label": "Option acquisition 1",
                  "value": "0",
                }, {
                  "label": "Option acquisition 2",
                  "value": "1",
                }, {
                  "label": "None",
                  "value": ""
                }
              ],
              //"disabled": true
            },
            {
              "type": "popup-checkbox",
              "label": "Ford only",
              "name": "ford_only",
              "options": [
                {
                  "label": "Option ford_only 1",
                  "value": "0",
                }, {
                  "label": "Option ford_only 2",
                  "value": "1",
                }, {
                  "label": "None",
                  "value": ""
                }
              ],
              //"disabled": true
             },
             {
               "type": "popup-checkbox",
               "label": "Ford Mustang",
               "name": "ford_mustang",
               "options": [
                 {
                   "label": "Option ford_mustang 1",
                   "value": "0",
                 }, {
                   "label": "Option ford_mustang 2",
                   "value": "1",
                 }, {
                   "label": "None",
                   "value": ""
                 }
               ],
               //"disabled": true
             },
             {
               "type": "popup-checkbox",
               "label": "Male 25-35",
               "name": "male_25_35",
               "options": [
                 {
                   "label": "Option male_25_35 1",
                   "value": "0",
                 }, {
                   "label": "Option male_25_35 2",
                   "value": "1",
                 }, {
                   "label": "None",
                   "value": ""
                 }
               ],
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

describe('MultiplePopupCheckboxField tests', () => {

  it('rendering and submitting a basic Formik form', async () => {
    const handleSubmit = jest.fn()

    const { container  } = render(<><button>button outside</button><GeneralFormik schema={schema2} submitHandler={handleSubmit} /></>)
    const user = userEvent.setup()

    const element = screen.queryAllByTestId("popup-checkbox");

    await user.click(element[0])

    await user.click(screen.getByLabelText(/Option dons_ford 2/i));

    expect(screen.getByLabelText(/Option dons_ford 2/i)).toBeChecked();

    const withIncreasedTimeout = { timeout: 1000 }
    const outsideElement = await waitFor(() => screen.getByText('button outside'), withIncreasedTimeout)
    fireEvent.click(outsideElement)

    await user.click(screen.getByRole('button', {name: /submit/i}))

    await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
            multiple_chips_array: {"dons_ford": ["0","1"], "acquisition": ["0"], "ford_only": ["0"], "ford_mustang": ["0"], "male_25_35": ["0"]},
        }),
    )
  })

  it('multiplepopupcheckbox_fieldEl should render', () => {
    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={()=>{jest.fn()}} />)
    const multiplepopupcheckbox_fieldEl = container.querySelector(`input[name="multiple_chips_array"]`);
    expect(multiplepopupcheckbox_fieldEl).toBeDefined();
  })

});
