import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe ("ProfileStatus component", () => {
    test("Status from props shuld be in the state", () => {
        const component = create(<ProfileStatus status="IT-kamasutra.com" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("IT-kamasutra.com");
    });
    test("After creation span shuld be", () => {
        const component = create(<ProfileStatus status="IT-kamasutra.com" />);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("After creation input shuld't be", () => {
        const component = create(<ProfileStatus status="IT-kamasutra.com" />);
        const root = component.root;
        expect(() => {
        root.findByType("input");
        }).toThrow();
    });
    test("After creation span shuld be", () => {
        const component = create(<ProfileStatus status="IT-kamasutra.com" />);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick();
        const input = root.findByType("input");
        expect(input.props.value).toBe("IT-kamasutra.com");
    });
    test("After creation span shuld be", () => {
        const mockFakeFunktion = jest.fn();
        const component = create(<ProfileStatus status="IT-kamasutra.com" updateStatus={mockFakeFunktion} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockFakeFunktion.mock.calls.length).toBe(1);
    });
})