import { mount } from "@vue/test-utils";
import CountryPhoneInput from "../../../components/UI/Form/CountryPhoneInput.vue";
import { VueTelInput } from "vue-tel-input";

describe("CountryPhoneInput.vue", () => {
    const defaultProps = {
        name: "phone",
        phone: "+3809911222333",
        country: "UA",
        items: ["UA", "US"],
        errors: {},
    };

    it("renders input element with correct attributes", async () => {
        const wrapper = mount(CountryPhoneInput, {
            props: defaultProps,
        });

        await wrapper.vm.$nextTick();

        const vueTelInput = wrapper.findComponent(VueTelInput);
        expect(vueTelInput.exists()).toBe(true);

        const input = vueTelInput.find("input");
        expect(input.attributes("name")).toBe(defaultProps.name);

        const inputValue = input.attributes("value").replace(/\s/g, "");
        expect(inputValue).toBe(defaultProps.phone);

        const flagContainer = wrapper.find(".vti__selection .vti__flag");
        expect(flagContainer.classes()).toContain(
            defaultProps.country.toLowerCase(),
        );
    });

    it("emits update:phone on input change", async () => {
        const wrapper = mount(CountryPhoneInput, {
            props: defaultProps,
        });

        const vueTelInput = wrapper.findComponent(VueTelInput);
        expect(vueTelInput.exists()).toBe(true);

        wrapper.vm.phone = defaultProps.phone;
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted("update:phone")).toBeTruthy();

        const emittedPhone = wrapper
            .emitted("update:phone")[0][0]
            .replace(/\s/g, "");
        expect(emittedPhone).toEqual(defaultProps.phone);
    });

    it("emits update:country on select country change", async () => {
        const wrapper = mount(CountryPhoneInput, {
            props: defaultProps,
        });

        const vueTelInput = wrapper.findComponent(VueTelInput);
        expect(vueTelInput.exists()).toBe(true);

        const newCountry = "US";
        wrapper.vm.updateCountry({ iso2: newCountry });

        await wrapper.vm.$nextTick();

        expect(wrapper.emitted("update:country")).toBeTruthy();
        expect(wrapper.emitted("update:country")[0]).toEqual([newCountry]);
    });

    it("displays error message when errors prop is provided", () => {
        const wrapper = mount(CountryPhoneInput, {
            props: {
                ...defaultProps,
                errors: {
                    phone: "The phone field is required.",
                },
            },
        });

        const errorDiv = wrapper.find("div.text-red-600");
        expect(errorDiv.exists()).toBe(true);
        expect(errorDiv.text()).toEqual("The phone field is required.");
    });
});
