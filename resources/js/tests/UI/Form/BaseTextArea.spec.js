import {mount} from "@vue/test-utils";
import BaseTextArea from "../../../components/UI/Form/BaseTextArea.vue";

describe("BaseTextArea components", () => {
    const defaultProps = {
        name: "about_me",
        placeholder: "About Me",
        modelValue: "Text about me",
        errors: {},
    };
    let wrapper;
    beforeEach(() => {
        wrapper = mount(BaseTextArea, {
            props: defaultProps,
        });
    })

    it("renders textArea element with correct attributes", () => {
        const textArea = wrapper.find("textarea");

        expect(textArea.exists()).toBe(true);
        expect(textArea.attributes("name")).toBe(defaultProps.name);
        expect(textArea.attributes("placeholder")).toBe(defaultProps.placeholder);
        expect(textArea.element.value).toBe(defaultProps.modelValue);
    });

    it("updates field when user types", async () => {
        const textArea = wrapper.find("textarea");

        expect(textArea.element.value).toBe(defaultProps.modelValue);

        const newText = "Second text about me"
        await textArea.setValue(newText);

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")[0]).toEqual([ newText ]);
    });

    it("displays error message when errors exists for field", () => {
        const error = "The about me field is required."
        const wrapper = mount(BaseTextArea, {
            props: {
                ...defaultProps,
                errors: {
                    about_me: error,
                },
            },
        });

        const errorDiv = wrapper.find(`[data-testid="${defaultProps.name}-error"]`);
        expect(errorDiv.exists()).toBe(true);
        expect(errorDiv.text()).toEqual(error);
    });
});
