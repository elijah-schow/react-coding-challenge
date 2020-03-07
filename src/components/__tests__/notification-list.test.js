import React from 'react'
import { render } from '@testing-library/react'
import NotificationList from '../notification-list'

describe('notification-list', () => {
    it('renders #smoke', () => {
        const props = {
            heading: "Error Type 1",
            items: [{
                id: "930b1506-699c-57d9-b697-a6b2bbfc63e9",
                priority: 1,
                message: "The quick, brown fox jumped over the lazy dog.",
            }],
            clearMessage: () => { },
        }
        const { container } = render(<NotificationList {...props} />)
        expect(container).toBeVisible()
    })
})
