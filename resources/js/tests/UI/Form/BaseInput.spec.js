import {mount} from "@vue/test-utils";
import BaseInput from "../../../components/UI/Form/BaseInput.vue";

describe("BaseInput component", () => {
    const defaultProps = {
        name: "email",
        type: "email",
        placeholder: "Email",
        modelValue: "email@example.com",
        errors: {},
    };

    let wrapper;
    beforeEach(() => {
        wrapper = mount(BaseInput, {props: defaultProps});
    })

    it("renders input element with correct attributes", async () => {
        const input = wrapper.find("input");

        expect(input.exists()).toBe(true);
        expect(input.attributes("name")).toBe(defaultProps.name);
        expect(input.attributes("placeholder")).toBe(defaultProps.placeholder);
        expect(input.attributes("type")).toBe(defaultProps.type);
        expect(input.element.value).toBe(defaultProps.modelValue);
    });

    it("updates field when user types", async () => {
        const input = wrapper.find("input");

        expect(input.element.value).toBe(defaultProps.modelValue);

        const newEmail = "test@gmail.com";
        await input.setValue(newEmail);

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")[0]).toEqual([ newEmail ]);
    });

    it("displays error message when errors exists for field", () => {
        const error = "The email field is required."
        const wrapper = mount(BaseInput, {
            props: {
                ...defaultProps,
                errors: {
                    email: error,
                },
            },
        });

        const errorDiv = wrapper.find(`[data-testid="${defaultProps.name}-error"]`);
        expect(errorDiv.exists()).toBe(true);
        expect(errorDiv.text()).toEqual(error);
    });
});
