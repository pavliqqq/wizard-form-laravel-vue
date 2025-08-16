import { mount } from "@vue/test-utils";
import CountryPhoneInput from "../../../components/UI/Form/CountryPhoneInput.vue";
import { VueTelInput } from "vue-tel-input";
import {nextTick} from "vue";

describe("CountryPhoneInput component", () => {
    const defaultProps = {
        name: "phone",
        phone: "+3809911222345",
        country: "UA",
        items: ["UA", "US"],
        errors: {},
    };

    let wrapper;
    beforeEach(() => {
        wrapper = mount(CountryPhoneInput, {
            props: defaultProps,
        });
    })
    it("renders input element with correct attributes", async () => {
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

    it("updates field when user types", async () => {
        const vueTelInput = wrapper.findComponent(VueTelInput);
        expect(vueTelInput.exists()).toBe(true);

        const newPhone = '+558475626832'
        wrapper.vm.phone = newPhone;

        await nextTick();

        expect(wrapper.emitted("update:phone")).toBeTruthy();

        const emittedEvents = wrapper.emitted("update:phone");
        const lastEmittedPhoneRaw = emittedEvents[emittedEvents.length - 1][0];
        const lastEmittedPhone = lastEmittedPhoneRaw.replace(/\s/g, "");

        expect(lastEmittedPhone).toEqual(newPhone);
    });

    it("updates field when user selects country", async () => {
        const vueTelInput = wrapper.findComponent(VueTelInput);
        expect(vueTelInput.exists()).toBe(true);

        const newCountry = "US";
        wrapper.vm.updateCountry({ iso2: newCountry });

        await nextTick();

        expect(wrapper.emitted("update:country")).toBeTruthy();
        expect(wrapper.emitted("update:country")[0]).toEqual([newCountry]);
    });

    it("displays error message when errors exists for field", () => {
        const error = "The phone field is required."
        const wrapper = mount(CountryPhoneInput, {
            props: {
                ...defaultProps,
                errors: {
                    phone: error,
                },
            },
        });

        const errorDiv = wrapper.find(`[data-testid="${defaultProps.name}-error"]`);
        expect(errorDiv.exists()).toBe(true);
        expect(errorDiv.text()).toEqual(error);
    });
});
