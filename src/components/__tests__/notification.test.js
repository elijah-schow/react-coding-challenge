import React from 'react'
import { render, fireEvent, getByRole, getByText } from '@testing-library/react'
import Notification from '../notification'

const message = () => ({
    id: "930b1506-699c-57d9-b697-a6b2bbfc63e9",
    priority: 1,
    message: "The quick, brown fox jumped over the lazy dog.",
})

const noop = () => { }

describe('notification', () => {

    it('renders #smoke', () => {
        const props = {
            item: message(),
            clearMessage: noop,
        }
        const { container } = render(<Notification {...props} />)
        expect(container).toBeVisible()
    })

    it('displays the message', () => {
        const item = message()
        const props = { item, clearMessage: noop }
        const { container } = render(<Notification {...props} />)

        const node = getByText(container, item.message)

        expect(node).toBeDefined()
    })

    /**
     * @warning this test assumes that "Clear" is the only button inside this
     * component. Update this test if that assumption becomes invalid.
     */
    it('calls the event handler when the clear button is clicked', () => {
        const clearMessage = jest.fn()
        const props = {
            item: message(),
            clearMessage,
        }
        const { container } = render(<Notification {...props} />)

        fireEvent.click(getByRole(container, 'button')) // see warning

        expect(clearMessage).toBeCalled()
    })

})
