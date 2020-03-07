import React from 'react'
import { render } from '@testing-library/react'
import Notification from '../notification'

describe('notification', () => {
    it('renders #smoke', () => {
        const props = {
            item: {
                id: "930b1506-699c-57d9-b697-a6b2bbfc63e9",
                priority: 1,
                message: "The quick, brown fox jumped over the lazy dog.",
            },
            clearMessage: () => { }
        }
        const { container } = render(<Notification {...props} />)
        expect(container).toBeVisible()
    })
})
