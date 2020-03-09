import React from 'react'
import { render } from '@testing-library/react'
import MessageList from '../message-list'

describe('message-list', () => {
    it('renders #smoke', () => {
        const { container } = render(<MessageList />)
        expect(container).toBeVisible()
    })
})
