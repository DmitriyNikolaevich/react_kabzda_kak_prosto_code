import React from 'react'
import { create } from 'react-test-renderer'
import Paginator from './Paginator'

describe ("ProfileStatus component", () => {
    test("Status from props shuld be in the state", () => {
        const component = create(<Paginator totalItemsCount={11} pageSize={1} currentPage={1} portionSize={10} />)
        const instance = component.root
        const button = instance.findAllByType("button")
        expect(button.length).toBe(11)
    })
})