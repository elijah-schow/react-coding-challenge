import React from 'react'
import { render, getByText, getByTitle } from '@testing-library/react'
import NotificationList from '../notification-list'

const noop = () => { }

const messageList = () => ([{
    id: "930b1506-699c-57d9-b697-a6b2bbfc63e9",
    priority: 1,
    message: "The quick, brown fox jumped over the lazy dog.",
}]);

describe('notification-list', () => {

    it('renders #smoke', () => {
        const props = {
            heading: "Error Type 1",
            items: messageList(),
            clearMessage: noop,
        }
        const { container } = render(<NotificationList {...props} />)
        expect(container).toBeVisible()
    })

    it('displays the provided header text', () => {
        const heading = "Error Type 1"
        const props = {
            heading,
            items: messageList(),
            clearMessage: noop,
        }
        const { container } = render(<NotificationList {...props} />)

        const node = getByText(container, heading)

        expect(node).toBeDefined()
    })

    /**
     * @fixme The test is coupled too tightly with the component's current
     * implementation. I would have just used `getByText` by itself, but the
     * length of the array is 1 and the heading also contains the number 1 as
     * well.
     */
    it('displays a count of messages', () => {
        const props = {
            heading: "Error Type 1",
            items: messageList(),
            clearMessage: noop,
        }
        const { container } = render(<NotificationList {...props} />)

        const node = getByTitle(container, 'count')

        expect(node).toBeDefined()
        expect(node).toHaveTextContent(props.items.length)
    })

})
