'use strict';
import * as React from "react";
import { QuickeyContext } from "../src";
import { configure, shallow, mount, render } from 'enzyme';
import * as Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe('@quickey/react', () => {

    describe('<QuickeyContext />', () => {

        it('should render', () => {
            const wrapper = shallow(
                <QuickeyContext>
                    <div id="child"></div>
                </QuickeyContext>
            );

            expect(wrapper.contains(<div id="child" />)).toBe(true);
        });

        it('should create root child from type prop', () => {
            const wrapper = shallow(
                <QuickeyContext type="span">
                </QuickeyContext>
            );

            expect(wrapper.contains(<span />)).toBe(true);
        });

        it('should not create root child if global prop is true', () => {
            const wrapper = shallow(
                <QuickeyContext global type="div">
                </QuickeyContext>
            );

            expect(wrapper.contains(<div />)).toBe(false);
        });

        it('should create root child if global prop is false', () => {
            const wrapper = shallow(
                <QuickeyContext global={false} type="div">
                </QuickeyContext>
            );

            expect(wrapper.contains(<div />)).toBe(true);
        });

        it('should add and trigger a new action', () => {

            const callback = jest.fn();

            const wrapper = shallow(
                <QuickeyContext global actions={[{
                    keys: "Ctrl + Alt + Delete",
                    callback
                }]}>
                </QuickeyContext>
            );

            [
                { which: 17, key: "Control" },
                { which: 18, key: "Alt" },
                { which: 46, key: "Delete" }
            ]
                .map((eventParams) => document.dispatchEvent(new KeyboardEvent("keydown", eventParams as any)));

            expect(callback).toBeCalledTimes(1);
        });
    });
});
