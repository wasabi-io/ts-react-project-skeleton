import * as React from "react";
import Component from "component/Component";
import {shallow} from "enzyme";

describe("Application", () => {
    it("dndmd", () => {
        class Deneme extends Component<any, any> {
            render(){
                return (
                    <div>Hello</div>
                )
            }
        }
        const wrapper = shallow(<Deneme />);
        // TODO need to change test environment from node as browser.
        // expect(wrapper.find("Deneme")).to.have.length(1);
    })
});
