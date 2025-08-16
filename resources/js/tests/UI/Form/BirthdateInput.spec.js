import { mount } from "@vue/test-utils";
import BirthdateInput from "../../../components/UI/Form/BirthdateInput.vue";
import BaseInput from "../../../components/UI/Form/BaseInput.vue";

describe("BirthdateInput component", () => {
    const mockToday = new Date("2025-07-29");
    const mockTodayString = mockToday.toISOString().split("T")[0];
    const expectedMaxDate = new Date("2009-07-29").toISOString().split("T")[0];

    const defaultMountOptions = {
        props: {
            modelValue: mockTodayString,
            errors: {},
        },
        global: {
            stubs: {
                BaseInput: true,
            },
        },
    };

    beforeAll(() => {
        jest.useFakeTimers("modern").setSystemTime(mockToday);
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    let wrapper;
    beforeEach(() => {
        wrapper = mount(BirthdateInput,  defaultMountOptions);
    })

    it("renders input element with correct type and max attributes", async () => {
        const baseInput = wrapper.findComponent(BaseInput);
        expect(baseInput.exists()).toBe(true);

        expect(baseInput.props("type")).toBe("date");
        expect(baseInput.props("max")).toBe(expectedMaxDate);
        expect(baseInput.props("modelValue")).toBe(mockTodayString);
    });

    it("updates field when user selects date", async () => {
        const baseInput = wrapper.findComponent(BaseInput);
        expect(baseInput.exists()).toBe(true);

        const newData = new Date("2000-01-01").toISOString().split("T")[0];
        await baseInput.vm.$emit("update:modelValue", newData);

        expect(wrapper.emitted("update:modelValue")).toBeTruthy();
        expect(wrapper.emitted("update:modelValue")[0]).toEqual([newData]);
    });

    it("displays error message when errors exists for field", () => {
        const error = "The birthdate field is required.";
        const errors = { birthdate: error };

        const wrapper = mount(BirthdateInput, {
            ...defaultMountOptions,
            props: {
                ...defaultMountOptions.props,
                errors,
            },
        });

        const baseInput = wrapper.findComponent(BaseInput);
        expect(baseInput.props("errors")).toEqual(errors);
    });
});
