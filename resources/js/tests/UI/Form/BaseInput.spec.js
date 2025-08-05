import { mount } from "@vue/test-utils";
import BaseInput from "../../../components/UI/Form/BaseInput.vue";

describe("BaseInput.vue", () => {
    const defaultProps = {
        name: "email",
        type: "email",
        placeholder: "Email",
        modelValue: "email@example.com",
        errors: {},
    };

    it("renders input element with correct attributes", () => {
        const wrapper = mount(BaseInput, {
            props: defaultProps,
        });

        const input = wrapper.find("input");

        expect(input.exists()).toBe(true);
        expect(input.attributes("name")).toBe("email");
        expect(input.attributes("placeholder")).toBe("Email");
        expect(input.attributes("type")).toBe("email");
        expect(input.element.value).toBe("email@example.com");
    });

    it("emits update:modelValue on input", async () => {
        const wrapper = mount(BaseInput, {
            props: defaultProps,
        });

        const input = wrapper.find("input");

        expect(input.element.value).toBe("email@example.com");

        await input.setValue("test@gmail.com");

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")[0]).toEqual([
            "test@gmail.com",
        ]);
    });

    it("displays error message when errors prop is provided", () => {
        const wrapper = mount(BaseInput, {
            props: {
                ...defaultProps,
                errors: {
                    email: "The email field is required.",
                },
            },
        });

        const errorDiv = wrapper.find("div.text-red-600");
        expect(errorDiv.exists()).toBe(true);
        expect(errorDiv.text()).toEqual("The email field is required.");
    });
});
