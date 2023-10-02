import React from 'react';
import GeneralFormik from "../GeneralFormik"
import * as yup from "yup";
import { expect, jest } from '@jest/globals';
import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

let schema2 = {
  "initialValues": {
      "popupradio_field": "1",
  },
  "fields": [
        {
          "type": "popup-radio",
          "name": "popupradio_field",
          "label": "Example of popup radio field",
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

describe('PopupRadioField.spec tests', () => {

  it('rendering and submitting a basic Formik form', async () => {
    const handleSubmit = jest.fn()

    const { container  } = render(<><button>button outside</button><GeneralFormik schema={schema2} submitHandler={handleSubmit} /></>)
    const user = userEvent.setup()

    await user.click(screen.getByTestId('popup-radio'))

    await user.click(screen.getByLabelText(/Option 3/i));

    expect(screen.getByLabelText(/Option 3/i)).toBeChecked();

    const withIncreasedTimeout = { timeout: 1000 }
    const outsideElement = await waitFor(() => screen.getByText('button outside'), withIncreasedTimeout)
    fireEvent.click(outsideElement)

    await user.click(screen.getByRole('button', {name: /submit/i}))

    await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
            popupradio_field: "2"
        }),
    )
  })

  it('popupradio_fieldEl should render', () => {
    const { container  } = render(<GeneralFormik schema={schema2} submitHandler={()=>{jest.fn()}} />)
    const popupradio_fieldEl = container.querySelector(`input[name="popupradio_field"]`);
    expect(popupradio_fieldEl).toBeDefined();
  })

});
