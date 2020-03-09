import React from 'react'
import { act } from 'react-dom/test-utils';
import { render, getByRole, getAllByText, fireEvent } from '@testing-library/react'

import ErrorSnackbar from '../error-snackbar'

const noop = () => { }

const message = () => "The quick, brown fox jumped over the lazy dog."

describe('error-snackbar', () => {

    it('renders #smoke', () => {
        const props = {
            message: message(),
            onClose: noop,
        }
        const { container } = render(<ErrorSnackbar {...props} />)
        expect(container).toBeVisible()
    })

    it('displays the message', () => {
        const props = {
            message: message(),
            onClose: noop
        }
        const { container } = render(<ErrorSnackbar {...props} />)

        const nodes = getAllByText(container, message)

        expect(nodes).toBeDefined()
    })

    /**
     * @warning this test assumes that "Close" is the only button inside this
     * component. Update this test if that assumption becomes invalid.
     */
    it('calls the event handler when the close button is clicked', () => {
        const onClose = jest.fn()
        const props = {
            message: message(),
            onClose,
        }
        const { container } = render(<ErrorSnackbar {...props} />)
        it.todo('closes after 2 seconds')

        fireEvent.click(getByRole(container, 'button')) // see warning

        expect(onClose).toBeCalled()
    })

    /**
     * @see https://jestjs.io/docs/en/timer-mocks
     */
    it('closes after 2 seconds', () => {
        jest.useFakeTimers();

        const onClose = jest.fn()
        const props = {
            message: message(),
            onClose,
        }
        const { container } = render(<ErrorSnackbar {...props} />)

        expect(onClose).not.toBeCalled()
        act(() => jest.advanceTimersByTime(2000));
        expect(onClose).toBeCalled()
    })

})
