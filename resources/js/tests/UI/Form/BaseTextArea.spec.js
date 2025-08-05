import { mount } from "@vue/test-utils";
import BaseTextArea from "../../../components/UI/Form/BaseTextArea.vue";

describe("BaseTextArea.vue", () => {
    const defaultProps = {
        name: "about_me",
        placeholder: "About Me",
        modelValue: "Text about me",
        errors: {},
    };

    it("renders textArea element with correct attributes", () => {
        const wrapper = mount(BaseTextArea, {
            props: defaultProps,
        });

        const textArea = wrapper.find("textarea");

        expect(textArea.exists()).toBe(true);
        expect(textArea.attributes("name")).toBe("about_me");
        expect(textArea.attributes("placeholder")).toBe("About Me");
        expect(textArea.element.value).toBe("Text about me");
    });

    it("emits update:modelValue on textArea", async () => {
        const wrapper = mount(BaseTextArea, {
            props: defaultProps,
        });

        const textArea = wrapper.find("textarea");

        expect(textArea.element.value).toBe("Text about me");

        await textArea.setValue("Second text about me");

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")[0]).toEqual([
            "Second text about me",
        ]);
    });

    it("displays error message when errors prop is provided", () => {
        const wrapper = mount(BaseTextArea, {
            props: {
                ...defaultProps,
                errors: {
                    about_me: "The about me field is required.",
                },
            },
        });

        const errorDiv = wrapper.find("div.text-red-600");
        expect(errorDiv.exists()).toBe(true);
        expect(errorDiv.text()).toEqual("The about me field is required.");
    });
});
