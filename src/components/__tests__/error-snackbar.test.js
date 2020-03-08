import React from 'react'
import { render, getByRole, getByText, fireEvent } from '@testing-library/react'
import ErrorSnackbar from '../error-snackbar'

const messageList = () => ([{
    id: "930b1506-699c-57d9-b697-a6b2bbfc63e9",
    priority: 1,
    message: "The quick, brown fox jumped over the lazy dog.",
}]);

describe('error-snackbar', () => {

    it('renders #smoke', () => {
        const props = {
            items: messageList(),
        }
        const { container } = render(<ErrorSnackbar {...props} />)
        expect(container).toBeVisible()
    })

    it.todo('opens when a new message is received')

    it.todo('closes after 2 seconds')

    it.todo('closes when the close button is clicked')

    it.todo('closes then immediately re-opens when a new message is received while the snackbar is open')

})
