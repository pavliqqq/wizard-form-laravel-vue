import { mount } from "@vue/test-utils";
import BirthdateInput from "../../../components/UI/Form/BirthdateInput.vue";
import BaseInput from "../../../components/UI/Form/BaseInput.vue";

describe("BirthdateInput.vue", () => {
    const mockToday = new Date("2025-07-29");
    const expectedMaxDate = new Date("2009-07-29").toISOString().split("T")[0];

    beforeAll(() => {
        jest.useFakeTimers("modern").setSystemTime(mockToday);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it("renders input element with correct type and max attributes", async () => {
        const wrapper = mount(BirthdateInput, {
            props: {
                modelValue: "",
                errors: {},
            },
            global: {
                stubs: {
                    BaseInput: true,
                },
            },
        });

        await wrapper.vm.$nextTick();

        const baseInput = wrapper.findComponent(BaseInput);
        expect(baseInput.exists()).toBe(true);

        expect(baseInput.props("type")).toBe("date");
        expect(baseInput.props("max")).toBe(expectedMaxDate);
    });

    it("emits update:modelValue on date change", async () => {
        const wrapper = mount(BirthdateInput, {
            props: {
                modelValue: "",
                errors: {},
            },
            global: {
                stubs: {
                    BaseInput: true,
                },
            },
        });

        const baseInput = wrapper.findComponent(BaseInput);
        expect(baseInput.exists()).toBe(true);

        await baseInput.vm.$emit("update:modelValue", "2000-01-01");

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")[0]).toEqual(["2000-01-01"]);
    });

    it("displays error message when errors prop is provided", () => {
        const wrapper = mount(BirthdateInput, {
            props: {
                modelValue: "",
                errors: {
                    birthdate: "The birthdate field is required.",
                },
            },
            global: {
                stubs: {
                    BaseInput: true,
                },
            },
        });

        const baseInput = wrapper.findComponent(BaseInput);
        expect(baseInput.props("errors")).toEqual({
            birthdate: "The birthdate field is required.",
        });
    });
});
